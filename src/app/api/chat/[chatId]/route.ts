import { getUser } from '@/actions';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function DELETE(req: Request, { params }: { params: Promise<{ chatId: string }> }) {
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

  return apiSuccess(undefined, ReasonPhrases.OK, StatusCodes.OK);
}
