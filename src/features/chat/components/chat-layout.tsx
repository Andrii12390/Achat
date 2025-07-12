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
    <main className="flex h-dvh">
      <section
        className={cn(
          'border-border flex w-full shrink-0 flex-col overflow-hidden border-r shadow-lg',
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
