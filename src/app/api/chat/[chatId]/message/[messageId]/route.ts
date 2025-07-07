import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ chatId: string; messageId: string }> },
) {
  try {
    const { chatId, messageId } = await params;

    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    await pusherServer.trigger(chatId, 'delete-message', messageId);

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
