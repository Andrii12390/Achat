import { PUSHER_EVENTS } from '@/constants';
import { pusherClient } from '@/lib/pusher';
import type { Chat, Message } from '@/types';
import { useEffect, useState } from 'react';

interface Props {
  userEmail: string;
  initialChats: Chat[];
}

export const useChats = ({ userEmail, initialChats }: Props) => {
  const [chats, setChats] = useState(initialChats);

  useEffect(() => {
    pusherClient.subscribe(userEmail);

    const handleCreateChat = (newChat: Chat) => {
      setChats(prev => [...prev, newChat]);
    };

    const handleDeleteChat = (idToDelete: string) => {
      setChats(prev => prev.filter(chat => chat.id !== idToDelete));
    };

    const handleUpdateChat = ({ chatId, newMessage }: { chatId: string; newMessage: Message }) => {
      setChats(prev =>
        prev.map(chat => {
          if (chat.id === chatId) {
            return { ...chat, messages: [newMessage, ...chat.messages] };
          }

          return chat;
        }),
      );
    };

    pusherClient.bind(PUSHER_EVENTS.NEW_CHAT, handleCreateChat);
    pusherClient.bind(PUSHER_EVENTS.DELETE_CHAT, handleDeleteChat);
    pusherClient.bind(PUSHER_EVENTS.UPDATE_CHAT, handleUpdateChat);

    return () => {
      pusherClient.unsubscribe(userEmail);

      pusherClient.unbind(PUSHER_EVENTS.NEW_CHAT, handleCreateChat);
      pusherClient.unbind(PUSHER_EVENTS.DELETE_CHAT, handleDeleteChat);
      pusherClient.unbind(PUSHER_EVENTS.UPDATE_CHAT, handleUpdateChat);
    };
  }, [userEmail]);

  return chats;
};
