'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { Chat } from '@/types';

import { SearchInput } from '@/components';
import { useChats } from '@/features/chat/hooks';
import { useDebounce } from '@/hooks';

import { ChatListItem, EmptyState } from '.';

interface Props {
  initialChats: Chat[];
  userEmail: string;
}

export const ChatList = ({ initialChats, userEmail }: Props) => {
  const chats = useChats({ initialChats, userEmail });

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const pathname = usePathname();

  const filteredChats = useMemo(() => {
    return chats.filter(chat =>
      chat.title?.toLowerCase().includes(debouncedQuery.toLocaleLowerCase()),
    );
  }, [chats, debouncedQuery]);

  const activeId = useMemo(() => pathname.split('/')[2] ?? '', [pathname]);

  return (
    <>
      <div className="bg-search-section sticky top-0 z-50 w-full -translate-y-1 px-4 py-2">
        <SearchInput
          placeholder="Search chats..."
          query={query}
          setQuery={setQuery}
        />
      </div>
      <ul className="bg-search-secttion">
        {filteredChats.length ? (
          filteredChats.map(chat => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              isActive={activeId === chat.id}
              title={chat.title!}
              avatarColor={chat.avatarColor!}
              imageUrl={chat.imageUrl}
              lastMessage={chat?.messages?.length ? chat.messages[0] : null}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </ul>
    </>
  );
};
