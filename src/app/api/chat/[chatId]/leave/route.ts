import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export const POST = withAuth<{ chatId: string }>(async (req, context, user) => {
  try {
    if (!user.isVerified) {
      return apiError('Not verified', StatusCodes.FORBIDDEN);
    }

    const { chatId } = await context.params;

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
