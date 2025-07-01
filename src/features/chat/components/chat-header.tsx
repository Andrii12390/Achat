import { UserAvatar } from '@/components';

import { DEFAULT_GROUP_IMAGE } from '@/lib/constants';

import { MoreVertical } from 'lucide-react';

import Image from 'next/image';

interface Props {
  title: string;
  avatarColor: string;
  imageUrl: string | null;
  isOnline?: boolean;
  isGroup?: boolean;
}

export const ChatHeader = ({
  title,
  imageUrl,
  avatarColor,
  isOnline = false,
  isGroup = false,
}: Props) => {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-secondary/50 border-b border-border">
      <div className="flex items-center gap-2">
        {isGroup ? (
          <Image
            src={imageUrl ?? DEFAULT_GROUP_IMAGE}
            width={48}
            height={48}
            alt="Group image"
          />
        ) : (
          <UserAvatar
            username={title}
            avatarColor={avatarColor}
            imageUrl={imageUrl}
            isOnline={isOnline}
          />
        )}
        <div>
          <p className="text-base font-semibold">{title}</p>
          {!isGroup && <p className="text-primary text-xs">{isOnline ? 'online' : 'offline'}</p>}
        </div>
      </div>
      <div className="p-2 hover:bg-icon-hover text-icon hover:text-icon-accent rounded-md cursor-pointer transition">
        <MoreVertical
          size={20}
          strokeWidth={1.7}
        />
      </div>
    </header>
  );
};
