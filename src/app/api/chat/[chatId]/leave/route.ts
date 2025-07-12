import { getUser } from '@/actions';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function POST(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    if (!user.isVerified) {
      return apiError('Not verified', StatusCodes.FORBIDDEN);
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
