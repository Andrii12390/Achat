import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';

export const GET = withAuth<object>(async (req, _, user) => {
  try {
    const usersList = await prisma.user.findMany({
      omit: {
        password: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: {
          not: user.id,
        },
      },
    });

    return apiSuccess(usersList, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export const DELETE = withAuth<object>(async (req, _, user) => {
  try {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return apiSuccess(user, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
