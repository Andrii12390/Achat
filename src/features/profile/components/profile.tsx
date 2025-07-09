'use client';

import { UserAvatar } from '@/components';
import { UserInfo, AvatarDialog } from '@/features/profile/components';

import { useAvatar } from '@/features/profile/hooks';
import { cn } from '@/lib/utils';

import { Camera } from 'lucide-react';
import { useState } from 'react';

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-foreground mb-6">Personal Information</h2>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
          <div className="relative shrink-0 group">
            <UserAvatar
              username={username}
              avatarColor={avatarColor}
              imageUrl={avatar}
              size="xl"
            />

            <button
              className={cn(
                'absolute inset-0 size-24 flex items-center justify-center rounded-full bg-black/40 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50',
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

          <div className="flex-1 w-full">
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
