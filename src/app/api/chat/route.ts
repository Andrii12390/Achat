import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { DEFAULT_GROUP_IMAGE, PUSHER_EVENTS } from '@/constants';
import { apiError, apiSuccess, withAuth } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { User } from '@/types';

async function findExistingDm(a: string, b: string) {
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

async function handleDmCreation(currentUser: User, otherUserId: string) {
  if (!otherUserId || otherUserId === currentUser.id) {
    return apiError('Invalid user ID provided.', StatusCodes.BAD_REQUEST);
  }

  const otherUser = await prisma.user.findUnique({ where: { id: otherUserId } });
  if (!otherUser) {
    return apiError('The specified user was not found.', StatusCodes.NOT_FOUND);
  }

  const existingChat = await findExistingDm(currentUser.id, otherUser.id);
  if (existingChat) {
    return apiSuccess(existingChat.id, ReasonPhrases.OK, StatusCodes.OK);
  }

  const newChat = await prisma.chat.create({
    data: {
      isGroup: false,
      participants: {
        createMany: { data: [{ userId: currentUser.id }, { userId: otherUser.id }] },
      },
    },
    include: { participants: { include: { user: true } } },
  });

  await Promise.all(
    newChat.participants.map(p =>
      pusherServer.trigger(p.user.email, PUSHER_EVENTS.NEW_CHAT, newChat),
    ),
  );

  return apiSuccess(newChat.id, ReasonPhrases.CREATED, StatusCodes.CREATED);
}

async function handleGroupCreation(
  currentUser: User,
  title: string | undefined,
  userIds: string[],
) {
  if (userIds?.length < 2) {
    return apiError('A group chat must have at least 2 members.', StatusCodes.BAD_REQUEST);
  }

  const participantIds = [...new Set([currentUser.id, ...userIds])];

  const newChat = await prisma.chat.create({
    data: {
      isGroup: true,
      title: title?.trim() || 'Untitled Group',
      imageUrl: DEFAULT_GROUP_IMAGE,
      participants: {
        createMany: {
          data: participantIds.map(id => ({
            userId: id,
            role: id === currentUser.id ? 'OWNER' : 'MEMBER',
          })),
        },
      },
    },
    include: { participants: { include: { user: true } } },
  });

  await Promise.all(
    newChat.participants.map(p =>
      pusherServer.trigger(p.user.email, PUSHER_EVENTS.NEW_CHAT, newChat),
    ),
  );
  return apiSuccess(newChat.id, ReasonPhrases.CREATED, StatusCodes.CREATED);
}

export const POST = withAuth(async (req, _, currentUser) => {
  try {
    if (!currentUser.isVerified) {
      return apiError(
        'Email not verified. Please verify your email to proceed.',
        StatusCodes.FORBIDDEN,
      );
    }

    const body = await req.json();

    if ('userId' in body && typeof body.userId === 'string') {
      return handleDmCreation(currentUser, body.userId);
    }

    if ('userIds' in body && Array.isArray(body.userIds)) {
      return handleGroupCreation(currentUser, body.title, body.userIds);
    }

    return apiError('Invalid request body', StatusCodes.BAD_REQUEST);
  } catch {
    return apiError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
