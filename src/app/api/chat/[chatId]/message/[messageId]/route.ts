import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { getUser } from '@/actions';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ chatId: string; messageId: string }> },
) {
  try {
    const user = await getUser();

    if (!user) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    if (!user.isVerified) {
      return apiError('Not verified', StatusCodes.FORBIDDEN);
    }

    const { chatId, messageId } = await params;

    await prisma.message.delete({
      where: {
        senderId: user.id,
        id: messageId,
      },
    });

    await pusherServer.trigger(chatId, 'delete-message', messageId);

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
