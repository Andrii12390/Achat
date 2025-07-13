import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { PUSHER_EVENTS } from '@/constants';
import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';

export const DELETE = withAuth<{ chatId: string; messageId: string }>(
  async (req, context, user) => {
    try {
      if (!user.isVerified) {
        return apiError('Not verified', StatusCodes.FORBIDDEN);
      }

      const { chatId, messageId } = await context.params;

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
  },
);
