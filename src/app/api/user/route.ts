import { getUser } from '@/actions';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

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
}

export async function DELETE() {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return apiSuccess(null, ReasonPhrases.NO_CONTENT, StatusCodes.NO_CONTENT);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
