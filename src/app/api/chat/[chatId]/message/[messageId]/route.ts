import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export async function DELETE(req: Request, { params }: { params: Promise<{ messageId: string }> }) {
  try {
    const { messageId } = await params;

    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    return apiSuccess(null, ReasonPhrases.OK, StatusCodes.OK);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
