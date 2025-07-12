import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: {
    chatId: string;
  };
};

export const POST = withAuth(async (req, context: RouteContext, user) => {
  try {
    if (!user.isVerified) {
      return apiError('Not verified', StatusCodes.FORBIDDEN);
    }

    const { chatId } = context.params;

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
});
