import { messageService } from '@/features/chat/services';
import { PUSHER_EVENTS } from '@/constants';
import { toast } from 'react-toastify';

import { type ExtendedMessage } from '@/types';

import { pusherClient } from '@/lib/pusher';

import { useEffect, useState } from 'react';

interface Props {
  chatId: string;
  userId: string;
  initialMessages: ExtendedMessage[];
}

export const useMessages = ({ chatId, userId, initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const reciveNewMessageHandler = (message: ExtendedMessage) => {
      setMessages(prev => [...prev, message]);
    };

    const deleteMessageHandler = (messageId: string) => {
      setMessages(prev => prev.filter(message => message.id !== messageId));
    };

    pusherClient.bind(PUSHER_EVENTS.NEW_MESSAGE, reciveNewMessageHandler);
    pusherClient.bind(PUSHER_EVENTS.DELETE_MESSAGE, deleteMessageHandler);

    return () => {
      pusherClient.unsubscribe(chatId);

      pusherClient.unbind(PUSHER_EVENTS.NEW_MESSAGE, reciveNewMessageHandler);
      pusherClient.unbind(PUSHER_EVENTS.DELETE_MESSAGE, deleteMessageHandler);
    };
  }, [chatId]);

  const handleDelete = async (senderId: string, messageId: string) => {
    if (senderId !== userId) {
      toast.error('You can delete only your own messages if you are not an Admin');
      return;
    }

    const res = await messageService.delete({ chatId, messageId });

    if (!res.success) {
      toast.error('Failed to delete message');
    }
  };

  return { messages, handleDelete };
};
