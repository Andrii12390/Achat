'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { type User } from '@/types';

import { toast } from 'react-toastify';

import { SearchInput } from '@/components';
import { EmptyState, UserListItem } from '.';

import { chatService } from '@/features/chat/services';

import { PRIVATE_ROUTES } from '@/lib/constants';

import { useDebounce } from '@/hooks';

interface Props {
  users: User[];
}

export const UserList = ({ users }: Props) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const router = useRouter();

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.username.toLowerCase().includes(debouncedQuery.toLocaleLowerCase()),
    );
  }, [users, debouncedQuery]);

  const handleCreateChat = async (userId: string) => {
    try {
      const res = await chatService.create(userId);
      if (res.success) {
        router.push(`${PRIVATE_ROUTES.CHATS}/${res.data}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <>
      <div className="py-2 px-4">
        <SearchInput
          placeholder="Search users..."
          query={query}
          setQuery={setQuery}
        />
      </div>
      <ul className="bg-secondary/20">
        {filteredUsers.length ? (
          filteredUsers.map(user => (
            <li
              key={user.id}
              className="border-l-6 border-transparent hover:border-l-sidebar-border hover:bg-secondary/50"
              onClick={() => handleCreateChat(user.id)}
            >
              <UserListItem
                isOnline={false}
                avatarColor={user.avatarColor}
                username={user.username}
                imageUrl={user.imageUrl}
              />
            </li>
          ))
        ) : (
          <EmptyState />
        )}
      </ul>
    </>
  );
};
