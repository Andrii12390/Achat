import { PRIVATE_ROUTES } from '@/constants';
import { cn, formatMessageDate } from '@/lib/utils';

import { type Message } from '@/types';

import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  avatarColor: string;
  imageUrl: string | null;
  lastMessage: Message | null;
  isActive: boolean;
}

export const ChatListItem = ({
  id,
  title,
  avatarColor,
  imageUrl,
  lastMessage,
  isActive,
}: Props) => {
  const lastMessageText = lastMessage?.text
    ? lastMessage?.text
    : lastMessage?.imageUrl
      ? 'Sent an image'
      : 'No messages yet';

  return (
    <li
      className={cn(
        'border-l-6 border-transparent',
        isActive
          ? 'bg-primary/15 border-l-primary'
          : 'hover:border-l-sidebar-border hover:bg-secondary/50',
      )}
    >
      <Link href={`${PRIVATE_ROUTES.CHATS}/${id}`}>
        <div className="flex items-center gap-3 p-3">
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={48}
              height={48}
              alt="User's profile image"
              className="rounded-full shadow-lg hover:scale-110"
            />
          ) : (
            <div
              className={cn(
                'size-12 rounded-full flex justify-center items-center shrink-0',
                avatarColor,
              )}
            >
              <span className="text-lg font-semibold text-primary-foreground">
                {title[0].toUpperCase()}
              </span>
            </div>
          )}
          <div className="w-full flex flex-col min-w-0">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{title}</p>
              {lastMessage && (
                <span className="text-sm text-muted-foreground text-end">
                  {formatMessageDate(lastMessage.createdAt)}
                </span>
              )}
            </div>
            <p className="text-xs truncate max-w-[60%]">{lastMessageText}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
