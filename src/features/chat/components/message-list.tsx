'use client';

import { MessageListItem } from '@/features/chat/components';
import { useMessages } from '@/features/chat/hooks';
import { type ExtendedMessage } from '@/types';

interface Props {
  chatId: string;
  userId: string;
  initialMessages: ExtendedMessage[];
}

export const MessageList = ({ chatId, userId, initialMessages }: Props) => {
  const { messages, handleDelete } = useMessages({ chatId, userId, initialMessages });

  return (
    <div className="no-scrollbar bg-secondary/30 h-full overflow-y-auto px-6 py-4">
      <ul>
        {messages.map(message => (
          <MessageListItem
            key={message.id}
            isSender={message.senderId === userId}
            username={message.sender.username}
            senderImage={message.sender.imageUrl}
            senderAvatarColor={message.sender.avatarColor}
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
