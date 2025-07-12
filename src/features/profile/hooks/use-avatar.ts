import { useState } from 'react';
import { toast } from 'react-toastify';

import { avatarService } from '@/features/profile/services';

export const useAvatar = (imageUrl: string | null) => {
  const [avatar, setAvatar] = useState(imageUrl);

  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await avatarService.upload(formData);

    if (res.success) {
      setAvatar(res.data ?? null);
    } else {
      toast.error(res.message);
    }
  };

  const handleAvatarDelete = async () => {
    const res = await avatarService.delete();
    if (res.success) {
      setAvatar(null);
    } else {
      toast.error(res.message);
    }
  };

  return {
    avatar,
    handleAvatarUpload,
    handleAvatarDelete,
  };
};
