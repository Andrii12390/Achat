import { getUser } from '@/actions';
import { MESSAGE_IMAGES_BUCKET_FOLDER, PUSHER_EVENTS } from '@/constants';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { s3Service } from '@/lib/s3/s3-service';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const createMessage = async ({
  chatId,
  userId,
  data,
}: {
  chatId: string;
  userId: string;
  data: Partial<{ text: string; imageUrl: string }>;
}) =>
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

export async function POST(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const { chatId } = await params;

    const userChat = await prisma.userChat.findUnique({
      where: { userId_chatId: { userId: user.id, chatId } },
    });

    if (!userChat) {
      return apiError(ReasonPhrases.FORBIDDEN, StatusCodes.FORBIDDEN);
    }

    const contentType = req.headers.get('content-type') || '';

    if (contentType.startsWith('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file');

      if (!(file instanceof File)) {
        return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
      }

      const fileUrl = await s3Service.uploadFile(
        Buffer.from(await file.arrayBuffer()),
        file.name,
        MESSAGE_IMAGES_BUCKET_FOLDER,
      );

      const newMessage = await createMessage({
        chatId,
        userId: user.id,
        data: { imageUrl: fileUrl },
      });

      await pusherServer.trigger(chatId, PUSHER_EVENTS.NEW_MESSAGE, newMessage);

      return apiSuccess(newMessage, ReasonPhrases.CREATED, StatusCodes.CREATED);
    }

    if (contentType.startsWith('application/json')) {
      const { text } = await req.json();

      if (!text) {
        return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
      }

      const newMessage = await createMessage({
        chatId,
        userId: user.id,
        data: { text },
      });

      await pusherServer.trigger(chatId, PUSHER_EVENTS.NEW_MESSAGE, newMessage);

      const chat = await prisma.chat.findUnique({
        where: { id: chatId },
        select: { id: true, participants: { select: { user: true } } },
      });

      Promise.all(
        chat!.participants.map(p =>
          pusherServer.trigger(p.user.email, PUSHER_EVENTS.UPDATE_CHAT, {
            chatId: chat?.id,
            newMessage,
          }),
        ),
      );

      return apiSuccess(newMessage, ReasonPhrases.CREATED, StatusCodes.CREATED);
    }

    return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
