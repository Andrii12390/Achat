import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import { UserAvatar } from '@/components';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn, formatMessageDate } from '@/lib/utils';

interface Props {
  isSender: boolean;
  username: string;
  senderImage: string | null;
  senderAvatarColor: string;
  text: string | null;
  imageUrl: string | null;
  createdAt: Date;
  handleDelete: () => void;
}

export const MessageListItem = ({
  isSender,
  username,
  senderImage,
  senderAvatarColor,
  text,
  imageUrl,
  createdAt,
  handleDelete,
}: Props) => {
  return (
    <li className="mt-2">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className={cn('flex w-fit max-w-[60%] gap-2', isSender ? 'ml-auto' : 'mr-auto')}>
            {!isSender && (
              <div className="self-end">
                <UserAvatar
                  username={username}
                  avatarColor={senderAvatarColor}
                  imageUrl={senderImage}
                />
              </div>
            )}
            <div
              className={cn(
                'rounded-2xl px-4 py-2 shadow-sm',
                isSender ? 'bg-primary-message rounded-br-md' : 'bg-secondary rounded-bl-md',
              )}
            >
              {text ? (
                <p className="text-sm break-all">{text}</p>
              ) : (
                <Image
                  src={imageUrl!}
                  alt="Message with image"
                  sizes="25vw"
                  className="h-auto w-full"
                  width={250}
                  height={250}
                />
              )}
              <p className="text-secondary-foreground mt-1 text-xs">
                {formatMessageDate(createdAt)}
              </p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="hover:bg-destructive/10 text-destructive !hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2
              className="text-destructive"
              size={24}
              strokeWidth={1.7}
            />
            <span>Delete Message</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </li>
  );
};
