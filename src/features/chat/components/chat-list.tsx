'use client';

import { useMemo, useState } from 'react';

import { type Chat } from '@/types';

import { SearchInput } from '@/components';
import { ChatListItem, EmptyState } from '.';

import { useDebounce } from '@/hooks';

import { usePathname } from 'next/navigation';

interface Props {
  chats: Chat[];
}

export const ChatList = ({ chats }: Props) => {
  const [query, setQuery] = useState('');

  const pathname = usePathname();

  const debouncedQuery = useDebounce(query);

  const filteredChats = useMemo(() => {
    return chats.filter(chat =>
      chat.title?.toLowerCase().includes(debouncedQuery.toLocaleLowerCase()),
    );
  }, [chats, debouncedQuery]);

  const activeId = useMemo(() => pathname.split('/')[2] ?? '', [pathname]);

  return (
    <>
      <div className="py-2 px-4">
        <SearchInput
          placeholder="Search chats..."
          query={query}
          setQuery={setQuery}
        />
      </div>
      <ul className="bg-secondary/20">
        {filteredChats.length ? (
          filteredChats.map(chat => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              isActive={activeId === chat.id}
              title={chat.title!}
              avatarColor={chat.avatarColor!}
              imageUrl={chat.imageUrl}
              lastMessage={chat.messages[0]}
            />
          ))
        ) : (
          <EmptyState />
        )}
      </ul>
    </>
  );
};
