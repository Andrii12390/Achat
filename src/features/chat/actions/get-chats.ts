'use server';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export const getChats = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const chats = await prisma.chat.findMany({
      orderBy: { lastMessageAt: 'desc' },
      where: {
        participants: { some: { userId: user.id } },
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
          orderBy: { createdAt: 'desc' },
          include: { sender: true },
        },
      },
    });

    return chats.map(chat => {
      if (chat.isGroup) return { ...chat, avatarColor: null };

      const otherParticipant = chat.participants.find(p => p.userId !== user.id);
      return {
        ...chat,
        avatarColor: otherParticipant?.user.avatarColor ?? null,
        imageUrl: otherParticipant?.user.imageUrl ?? null,
        title: otherParticipant?.user.username ?? null,
      };
    });
  } catch {
    return null;
  }
};
