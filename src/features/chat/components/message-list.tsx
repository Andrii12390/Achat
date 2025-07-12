'use client';

import { type ExtendedMessage } from '@/types';

import { MessageListItem } from '@/features/chat/components';
import { useMessages } from '@/features/chat/hooks';

interface Props {
  chatId: string;
  userId: string;
  initialMessages: ExtendedMessage[];
}

export const MessageList = ({ chatId, userId, initialMessages }: Props) => {
  const { messages, handleDelete } = useMessages({ chatId, userId, initialMessages });

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-6 py-4 bg-secondary/30">
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
