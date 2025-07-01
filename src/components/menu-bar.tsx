'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks';
import { User } from 'lucide-react';

export const Menubar = () => {
  const menu = useMenu();

  return (
    <nav className="p-2.5 bg-secondary/50 border-t border-border">
      <ul className="grid grid-cols-3 place-items-center">
        {menu.map(({ href, icon: Icon, text, isCurrent }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                'py-2 px-4  rounded-md block ',
                isCurrent
                  ? 'text-primary bg-primary/10'
                  : 'hover:bg-icon-hover text-icon hover:text-icon-accent',
              )}
            >
              <Icon
                size={24}
                strokeWidth={1.7}
                className="mx-auto"
              />
              <p className="text-xs font-medium mt-2">{text}</p>
            </Link>
          </li>
        ))}
        <li>
          <button className="py-2 px-4 rounded-md hover:bg-icon-hover text-icon hover:text-icon-accent cursor-pointer">
            <User
              size={24}
              strokeWidth={1.7}
              className="mx-auto"
            />
            <p className="text-xs font-medium mt-2">Profile</p>
          </button>
        </li>
      </ul>
    </nav>
  );
};
