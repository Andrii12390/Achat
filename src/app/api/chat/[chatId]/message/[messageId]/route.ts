import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { PUSHER_EVENTS } from '@/constants';
import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';

type RouteContext = {
  params: {
    chatId: string;
    messageId: string;
  };
};

export const DELETE = withAuth(async (req, context: RouteContext, user) => {
  try {
    if (!user.isVerified) {
      return apiError('Not verified', StatusCodes.FORBIDDEN);
    }

    const { chatId, messageId } = context.params;

    await prisma.message.delete({
      where: {
        senderId: user.id,
        id: messageId,
      },
    });

    await pusherServer.trigger(chatId, PUSHER_EVENTS.DELETE_MESSAGE, messageId);

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
