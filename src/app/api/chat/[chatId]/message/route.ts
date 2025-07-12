import { type Message } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { type NextRequest } from 'next/server';

import { MESSAGE_IMAGES_BUCKET_FOLDER, PUSHER_EVENTS } from '@/constants';
import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { s3Service } from '@/lib/s3/s3-service';

type RouteContext = {
  params: {
    chatId: string;
  };
};

export const POST = withAuth(async (req, context: RouteContext, user) => {
  const { chatId } = context.params;
  try {
    if (!user.isVerified) {
      return apiError('Email not verified.', StatusCodes.FORBIDDEN);
    }

    const isParticipant = await prisma.userChat.findUnique({
      where: { userId_chatId: { userId: user.id, chatId } },
    });

    if (!isParticipant) {
      return apiError('You are not a member of this chat.', StatusCodes.FORBIDDEN);
    }

    const contentType = req.headers.get('content-type') || '';

    if (contentType.startsWith('application/json')) {
      return handleTextMessage(req, chatId, user.id);
    }

    if (contentType.startsWith('multipart/form-data')) {
      return handleImageMessage(req, chatId, user.id);
    }

    return apiError('Unsupported Content-Type.', StatusCodes.BAD_REQUEST);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

const createMessageInDb = (
  chatId: string,
  userId: string,
  data: Partial<{ text: string; imageUrl: string }>,
) =>
  prisma.message.create({
    data: {
      ...data,
      sender: { connect: { id: userId } },
      chat: { connect: { id: chatId } },
    },
    include: {
      sender: { select: { id: true, username: true, imageUrl: true, email: true } },
    },
  });

async function notifyParticipants(chatId: string, newMessage: Message) {
  await pusherServer.trigger(chatId, PUSHER_EVENTS.NEW_MESSAGE, newMessage);

  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    select: { participants: { select: { user: { select: { email: true } } } } },
  });

  if (chat) {
    await Promise.all(
      chat.participants.map(p =>
        pusherServer.trigger(p.user.email, PUSHER_EVENTS.UPDATE_CHAT, {
          chatId,
          newMessage,
        }),
      ),
    );
  }
}

async function handleTextMessage(req: NextRequest, chatId: string, userId: string) {
  const { text } = await req.json();
  if (!text || typeof text !== 'string') {
    return apiError('Text is required.', StatusCodes.BAD_REQUEST);
  }

  const newMessage = await createMessageInDb(chatId, userId, { text });
  await notifyParticipants(chatId, newMessage);

  return apiSuccess(newMessage, ReasonPhrases.CREATED, StatusCodes.CREATED);
}

async function handleImageMessage(req: NextRequest, chatId: string, userId: string) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return apiError('A file is required for this request.', StatusCodes.BAD_REQUEST);
  }

  const fileUrl = await s3Service.uploadFile(
    Buffer.from(await file.arrayBuffer()),
    file.name,
    MESSAGE_IMAGES_BUCKET_FOLDER,
  );

  const newMessage = await createMessageInDb(chatId, userId, { imageUrl: fileUrl });
  await notifyParticipants(chatId, newMessage);

  return apiSuccess(newMessage, ReasonPhrases.CREATED, StatusCodes.CREATED);
}
