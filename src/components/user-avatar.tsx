import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  username: string;
  avatarColor: string;
  imageUrl: string | null;
  isOnline: boolean;
  size?: 'sm' | 'md';
}

const sizeConfig = {
  sm: { dimension: 28, text: 'text-sm', indicator: 'size-2', avatar: 'size-7' },
  md: { dimension: 48, text: 'text-lg', indicator: 'size-2.5', avatar: 'size-12' },
};

const OnlineIndicator = ({ isOnline, size }: { isOnline: boolean; size: 'sm' | 'md' }) => {
  if (!isOnline) return null;
  return (
    <div
      className={cn(
        'absolute rounded-full bg-primary ring-2 ring-white right-0 top-1',
        sizeConfig[size].indicator,
      )}
    />
  );
};

export const UserAvatar = ({ username, isOnline, imageUrl, avatarColor, size = 'md' }: Props) => {
  const { dimension, text, avatar } = sizeConfig[size];

  if (imageUrl) {
    return (
      <div className="relative inline-block">
        <Image
          src={imageUrl}
          alt={`${username}'s profile image`}
          width={dimension}
          height={dimension}
          className="rounded-full"
        />
        <OnlineIndicator
          isOnline={isOnline}
          size={size}
        />
      </div>
    );
  }

  return (
    <div
      className={cn('relative flex justify-center items-center rounded-full', avatarColor, avatar)}
    >
      <span className={cn('font-semibold text-primary-foreground', text)}>
        {username[0].toUpperCase()}
      </span>
      <OnlineIndicator
        isOnline={isOnline}
        size={size}
      />
    </div>
  );
};
