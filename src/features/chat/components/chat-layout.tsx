'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const ChatLayout = ({ sidebar, children }: Props) => {
  const pathname = usePathname();

  const isSpecificChat = pathname.startsWith('/chats/') && pathname !== '/chats';

  return (
    <main className="h-dvh flex">
      <section
        className={cn(
          'w-full shrink-0 flex flex-col border-r border-border overflow-hidden shadow-lg',
          'sm:w-64 md:w-80 lg:w-84',
          isSpecificChat ? 'hidden sm:flex' : 'flex',
        )}
      >
        {sidebar}
      </section>

      <div className={cn('flex-1', isSpecificChat ? 'w-full' : 'hidden sm:block')}>{children}</div>
    </main>
  );
};
