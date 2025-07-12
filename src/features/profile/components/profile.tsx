'use client';

import { Camera } from 'lucide-react';
import { useState } from 'react';

import { UserAvatar } from '@/components';
import { UserInfo, AvatarDialog } from '@/features/profile/components';
import { useAvatar } from '@/features/profile/hooks';
import { cn } from '@/lib/utils';

interface Props {
  username: string;
  email: string;
  avatarColor: string;
  imageUrl: string | null;
}

export const Profile = ({ username, email, avatarColor, imageUrl }: Props) => {
  const { avatar, handleAvatarUpload, handleAvatarDelete } = useAvatar(imageUrl);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <section className="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8">
        <h2 className="text-foreground mb-6 text-xl font-semibold">Personal Information</h2>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
          <div className="group relative shrink-0">
            <UserAvatar
              username={username}
              avatarColor={avatarColor}
              imageUrl={avatar}
              size="xl"
            />

            <button
              className={cn(
                'focus:ring-primary/50 absolute inset-0 flex size-24 cursor-pointer items-center justify-center rounded-full bg-black/40 transition-all duration-200 focus:ring-2 focus:outline-none',
                isHovering ? 'opacity-100' : 'opacity-0 hover:opacity-100',
              )}
              onClick={() => setIsOpenDialog(true)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Camera
                size={24}
                className="text-white"
                strokeWidth={1.5}
              />
            </button>
          </div>

          <div className="w-full flex-1">
            <UserInfo
              username={username}
              email={email}
            />
          </div>
        </div>
      </section>

      <AvatarDialog
        open={isOpenDialog}
        onOpenChange={setIsOpenDialog}
        hasAvatar={!!avatar}
        onUpload={handleAvatarUpload}
        onDelete={handleAvatarDelete}
      />
    </div>
  );
};
