import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { DEFAULT_GROUP_IMAGE, PUSHER_EVENTS, USER_AVATARS_BUCKET_FOLDER } from '@/constants';
import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { s3Service } from '@/lib/s3/s3-service';

type RouteContext = {
  params: {
    chatId: string;
  };
};

export const DELETE = withAuth(async (req, context: RouteContext, user) => {
  try {
    if (!user.isVerified) {
      return apiError('Not verified', StatusCodes.FORBIDDEN);
    }

    const { chatId } = context.params;

    const userChat = await prisma.userChat.findUnique({
      where: {
        userId_chatId: {
          userId: user.id,
          chatId,
        },
      },
    });

    if (!userChat) {
      return apiError(ReasonPhrases.FORBIDDEN, StatusCodes.FORBIDDEN);
    }

    const deletedChat = await prisma.chat.delete({
      where: {
        id: chatId,
      },
      select: { id: true, participants: { select: { user: true } } },
    });

    Promise.all(
      deletedChat.participants.map(p =>
        pusherServer.trigger(p.user.email, PUSHER_EVENTS.DELETE_CHAT, deletedChat.id),
      ),
    );

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export const PATCH = withAuth(async (req, context: RouteContext, user) => {
  const { chatId } = context.params;
  try {
    const userChat = await prisma.userChat.findFirst({
      where: { userId: user.id, chatId },
      include: { chat: true },
    });

    if (!userChat) {
      return apiError(ReasonPhrases.FORBIDDEN, StatusCodes.FORBIDDEN);
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');

    if (typeof title !== 'string' || !title.trim()) {
      return apiError('Title is required', StatusCodes.BAD_REQUEST);
    }

    const updateData: { title: string; imageUrl?: string | null } = {
      title: title.trim(),
    };

    const newImageUrl = await handleGroupImage(file, userChat.chat.imageUrl);
    if (newImageUrl !== undefined) {
      updateData.imageUrl = newImageUrl;
    }

    const updatedChat = await prisma.chat.update({
      where: { id: chatId },
      data: updateData,
      include: {
        participants: {
          select: { user: { select: { email: true } } },
        },
      },
    });

    await Promise.all(
      updatedChat.participants.map(p =>
        pusherServer.trigger(p.user.email, PUSHER_EVENTS.UPDATE_CHAT, updatedChat),
      ),
    );

    return apiSuccess(updatedChat, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

async function handleGroupImage(
  file: FormDataEntryValue | null,
  currentImageUrl: string | null,
): Promise<string | null | undefined> {
  const isNewFile = file instanceof File;
  const isImageRemoved = file === 'null';

  if (isNewFile) {
    const newImageUrl = await s3Service.uploadFile(
      Buffer.from(await file.arrayBuffer()),
      file.name,
      USER_AVATARS_BUCKET_FOLDER,
    );

    if (currentImageUrl && currentImageUrl !== DEFAULT_GROUP_IMAGE) {
      await s3Service.deleteFile(currentImageUrl);
    }
    return newImageUrl;
  }

  if (isImageRemoved) {
    if (currentImageUrl && currentImageUrl !== DEFAULT_GROUP_IMAGE) {
      await s3Service.deleteFile(currentImageUrl);
    }
    return null;
  }

  return undefined;
}
