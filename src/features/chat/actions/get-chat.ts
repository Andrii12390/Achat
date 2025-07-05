'use server';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export const getChat = async (chatId: string) => {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, username: true, imageUrl: true, avatarColor: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: {
              select: { id: true, username: true, imageUrl: true, email: true, avatarColor: true },
            },
          },
        },
      },
    });

    if (chat?.isGroup) {
      return chat;
    }

    const otherParticipant = chat?.participants.find(p => p.userId !== user.id);

    return {
      ...chat,
      avatarColor: otherParticipant?.user.avatarColor ?? null,
      imageUrl: otherParticipant?.user.imageUrl ?? null,
      title: otherParticipant?.user.username ?? null,
    };
  } catch {
    return null;
  }
};
