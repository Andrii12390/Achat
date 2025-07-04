'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Users, MessageCircle, User } from 'lucide-react';
import { PRIVATE_ROUTES } from '@/constants';

export const useMenu = () => {
  const pathname = usePathname();

  const menu = useMemo(
    () => [
      {
        href: PRIVATE_ROUTES.CHATS,
        icon: MessageCircle,
        text: 'Chats',
        isCurrent: pathname.startsWith(PRIVATE_ROUTES.CHATS),
      },
      {
        href: PRIVATE_ROUTES.USERS,
        icon: Users,
        text: 'Users',
        isCurrent: pathname.startsWith(PRIVATE_ROUTES.USERS),
      },
      {
        href: PRIVATE_ROUTES.PROFILE,
        icon: User,
        text: 'Profile',
        isCurrent: pathname.startsWith(PRIVATE_ROUTES.PROFILE),
      },
    ],
    [pathname],
  );

  return menu;
};
