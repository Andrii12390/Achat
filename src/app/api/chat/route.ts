import { getUser } from '@/actions';
import { apiError, apiSuccess } from '@/lib/api';
import { DEFAULT_GROUP_IMAGE } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { Chat } from '@prisma/client';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export async function POST(req: Request) {
  try {
    const currentUser = await getUser();
    if (!currentUser) {
      return apiError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }

    const body = (await req.json()) as { userId: string } | { title?: string; userIds: string[] };

    if ('userId' in body) {
      const { userId } = body;
      if (!userId || userId === currentUser.id) {
        return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
      }

      const otherUser = await prisma.user.findUnique({ where: { id: userId } });
      if (!otherUser) {
        return apiError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
      }

      const existing = await findExistingDm(currentUser.id, otherUser.id);
      if (existing) {
        return apiSuccess(existing.id, ReasonPhrases.OK, StatusCodes.OK);
      }

      const chat = await prisma.chat.create({
        data: {
          isGroup: false,
          participants: {
            createMany: {
              data: [{ userId: currentUser.id }, { userId: otherUser.id }],
            },
          },
        },
      });

      return apiSuccess(chat.id, ReasonPhrases.CREATED, StatusCodes.CREATED);
    }

    if ('userIds' in body) {
      const { title, userIds } = body;

      if (userIds?.length < 2) {
        return apiError('userIds must contain at least 2 idS', StatusCodes.BAD_REQUEST);
      }

      const uniqueIds = [...new Set(userIds.filter(id => id !== currentUser.id))];

      const users = await prisma.user.findMany({
        where: { id: { in: uniqueIds } },
        select: { id: true },
      });
      if (users.length !== uniqueIds.length) {
        return apiError('Some users not found', StatusCodes.NOT_FOUND);
      }

      const chat = await prisma.chat.create({
        data: {
          isGroup: true,
          title: title ?? 'Untitled group',
          imageUrl: DEFAULT_GROUP_IMAGE,
          participants: {
            createMany: {
              data: [
                { userId: currentUser.id, role: 'OWNER' },
                ...uniqueIds.map(id => ({ userId: id })),
              ],
            },
          },
        },
      });

      return apiSuccess(chat.id, ReasonPhrases.CREATED, StatusCodes.CREATED);
    }

    return apiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function findExistingDm(a: string, b: string): Promise<Chat | null> {
  try {
    return prisma.chat.findFirst({
      where: {
        isGroup: false,
        participants: {
          every: { userId: { in: [a, b] } },
        },
        AND: [{ participants: { some: { userId: a } } }, { participants: { some: { userId: b } } }],
      },
    });
  } catch {
    return null;
  }
}
