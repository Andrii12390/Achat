'use client';

import Link from 'next/link';

import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';
import { useMenu } from '@/hooks';
import { cn } from '@/lib/utils';

export const Menubar = () => {
  const menu = useMenu();

  return (
    <nav className="bg-secondary/50 border-border border-t p-2.5">
      <ul className="grid grid-cols-3 place-items-center">
        {menu.map(({ href, icon: Icon, text, isCurrent }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                'block rounded-md px-4 py-2',
                isCurrent
                  ? 'text-primary bg-primary/10'
                  : 'hover:bg-icon-hover text-icon hover:text-icon-accent',
              )}
            >
              <Icon
                size={ICON_SIZES.LG}
                strokeWidth={ICON_STROKE_WIDTH}
                className="mx-auto"
              />
              <p className="mt-2 text-xs font-medium">{text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
