import { AVATAR_GRADIENTS } from '@/features/auth/lib/constants';

export const getRandomAvatarColor = () => {
  return AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)];
};
