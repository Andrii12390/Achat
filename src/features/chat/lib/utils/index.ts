import type { Chat, User } from '@/types';

export const getChatDisplayData = (chat: Partial<Chat>, currentUser: Partial<User>) => {
  if (chat.isGroup) {
    return {
      title: chat.title || 'Untitled',
      imageUrl: chat.imageUrl ?? '',
      avatarColor: '',
    };
  }

  const otherUser = chat.participants?.find(p => p.userId !== currentUser.id);

  return {
    title: otherUser?.user.username ?? '',
    imageUrl: otherUser?.user.imageUrl ?? '',
    avatarColor: otherUser?.user.avatarColor ?? '',
  };
};
