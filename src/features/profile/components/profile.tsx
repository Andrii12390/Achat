'use client';

import { UserAvatar } from '@/components';
import { UserInfo, AvatarDialog } from '@/features/profile/components';

import { useAvatar } from '@/features/profile/hooks';

import { Camera } from 'lucide-react';
import { useState } from 'react';

interface Props {
  username: string;
  email: string;
  avatarColor: string;
  imageUrl: string | null;
  isVerified: boolean;
}

export const Profile = ({ username, email, avatarColor, imageUrl, isVerified }: Props) => {
  const { avatar, handleAvatarUpload, handleAvatarDelete } = useAvatar(imageUrl);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <section className="p-8 rounded-lg bg-secondary/30 border shadow-md max-w-4xl mx-auto space-y-4">
      <h2 className="font-semibold text-xl">Personal Info</h2>

      <div className="flex items-center gap-8">
        <div className="relative shrink-0 group">
          <UserAvatar
            username={username}
            avatarColor={avatarColor}
            imageUrl={avatar}
            size="xl"
          />
          <button
            type="button"
            className="absolute inset-0 size-24 flex items-center justify-center rounded-full group-hover:bg-black/30 transition-all duration-200 cursor-pointer focus-visible:ring-2 ring-primary"
            onClick={() => setIsOpenDialog(true)}
            tabIndex={0}
          >
            <Camera
              size={32}
              className="text-white/90 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100"
              strokeWidth={1.7}
            />
          </button>
        </div>

        <UserInfo
          username={username}
          email={email}
          isVerified={isVerified}
        />
      </div>

      <AvatarDialog
        open={isOpenDialog}
        onOpenChange={setIsOpenDialog}
        hasAvatar={!!avatar}
        onUpload={handleAvatarUpload}
        onDelete={handleAvatarDelete}
      />
    </section>
  );
};
