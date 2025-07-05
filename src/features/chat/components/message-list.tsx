'use client';

import { messageService } from '@/features/chat/services';

import { type ExtendedMessage } from '@/types';

import { MessageListItem } from '.';
import { toast } from 'react-toastify';

interface Props {
  chatId: string;
  userId: string;
  messages: ExtendedMessage[];
}

export const MessageList = ({ chatId, userId, messages }: Props) => {
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

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-6 py-4 bg-secondary/30">
      <ul>
        {messages.map(message => (
          <MessageListItem
            key={message.id}
            isSender={message.senderId === userId}
            text={message.text}
            imageUrl={message.imageUrl}
            createdAt={message.createdAt}
            handleDelete={() => handleDelete(message.senderId, message.id)}
          />
        ))}
      </ul>
    </div>
  );
};
