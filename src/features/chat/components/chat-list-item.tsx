import Image from 'next/image';
import Link from 'next/link';

import { ICON_SIZES, PRIVATE_ROUTES } from '@/constants';
import { cn, formatMessageDate } from '@/lib/utils';
import { type Message } from '@/types';

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
              width={ICON_SIZES['2XL']}
              height={ICON_SIZES['2XL']}
              alt="User's profile image"
              className="rounded-full shadow-lg hover:scale-110"
            />
          ) : (
            <div
              className={cn(
                'flex size-12 shrink-0 items-center justify-center rounded-full',
                avatarColor,
              )}
            >
              <span className="text-primary-foreground text-lg font-semibold">
                {title[0].toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex w-full min-w-0 flex-col">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{title}</p>
              {lastMessage && (
                <span className="text-muted-foreground text-end text-sm">
                  {formatMessageDate(lastMessage.createdAt)}
                </span>
              )}
            </div>
            <p className="max-w-[60%] truncate text-xs">{lastMessageText}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
