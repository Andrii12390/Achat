import { getUser } from '@/actions';
import { DEFAULT_GROUP_IMAGE, PUSHER_EVENTS, USER_AVATARS_BUCKET_FOLDER } from '@/constants';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { s3Service } from '@/lib/s3/s3-service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function DELETE(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    if (!user.isVerified) {
      return apiError('Not verified', StatusCodes.FORBIDDEN);
    }

    const { chatId } = await params;

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
}

export async function PATCH(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const { chatId } = await params;

    const userChat = await prisma.userChat.findFirst({
      where: {
        userId: user.id,
        chatId,
      },
      include: {
        chat: true,
      },
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

    if (file instanceof File) {
      if (userChat.chat.imageUrl && userChat.chat.imageUrl !== DEFAULT_GROUP_IMAGE) {
        await s3Service.deleteFile(userChat.chat.imageUrl);
      }
      const fileUrl = await s3Service.uploadFile(
        Buffer.from(await file.arrayBuffer()),
        file.name,
        USER_AVATARS_BUCKET_FOLDER,
      );
      updateData.imageUrl = fileUrl;
    } else if (file === 'null') {
      if (userChat.chat.imageUrl) {
        await s3Service.deleteFile(userChat.chat.imageUrl);
      }
      updateData.imageUrl = DEFAULT_GROUP_IMAGE;
    }

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: updateData,
      include: {
        participants: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    await Promise.all(
      updatedChat.participants.map(p =>
        pusherServer.trigger(p.user.email, PUSHER_EVENTS.UPDATE_CHAT, updatedChat),
      ),
    );

    return apiSuccess(updatedChat, ReasonPhrases.OK, StatusCodes.OK);
  } catch (error) {
    console.error('Error updating chat:', error);
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
