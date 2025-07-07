import { getUser } from '@/actions';
import { PUSHER_EVENTS } from '@/constants';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function DELETE(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
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

    await prisma.userChat.delete({
      where: {
        userId_chatId: {
          userId: user.id,
          chatId,
        },
      },
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
