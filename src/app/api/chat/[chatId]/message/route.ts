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

    const { text, imageUrl } = await req.json();

    if (!text && !imageUrl) {
      return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        imageUrl,
        sender: {
          connect: { id: user.id },
        },
        chat: { connect: { id: chatId } },
      },
      include: {
        sender: { select: { id: true, username: true, imageUrl: true, email: true } },
      },
    });

    return apiSuccess(newMessage, ReasonPhrases.CREATED, StatusCodes.CREATED);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
