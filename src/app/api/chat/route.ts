import { getUser } from '@/actions';
import { apiError, apiSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { Chat } from '@prisma/client';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function POST(request: Request) {
  const currentUser = await getUser();

  if (!currentUser) {
    return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }

  const { userId } = await request.json();

  if (!userId) {
    return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
  }

  const otherUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!otherUser) {
    return apiError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
  }

  const existingChat = await findExistingChat(currentUser.id, otherUser.id);

  if (existingChat) {
    return apiSuccess(existingChat.id, ReasonPhrases.OK, StatusCodes.OK);
  }

  const newChat = await prisma.chat.create({
    data: {
      participants: {
        create: [
          {
            userId: currentUser.id,
          },
          {
            userId: otherUser.id,
          },
        ],
      },
    },
  });

  return apiSuccess(newChat.id, ReasonPhrases.CREATED, StatusCodes.CREATED);
}

export async function GET() {
  const user = await getUser();

  if (!user) {
    return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }

  const chats = await prisma.chat.findMany({
    orderBy: {
      lastMessageAt: 'desc',
    },
    where: {
      participants: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      participants: true,
      messages: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          sender: true,
        },
      },
    },
  });

  return apiSuccess(chats, ReasonPhrases.OK, StatusCodes.OK);
}

async function findExistingChat(userId1: string, userId2: string): Promise<Chat | null> {
  return prisma.chat.findFirst({
    where: {
      participants: {
        every: {
          userId: { in: [userId1, userId2] },
        },
      },
      AND: [
        { participants: { some: { userId: userId1 } } },
        { participants: { some: { userId: userId2 } } },
      ],
    },
  });
}
