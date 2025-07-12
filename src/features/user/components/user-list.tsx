'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { SearchInput } from '@/components';
import { PRIVATE_ROUTES } from '@/constants';
import { chatService } from '@/features/chat/services';
import { useDebounce } from '@/hooks';
import { useOnlineUsers } from '@/hooks/use-online-users';
import { type User } from '@/types';

import { EmptyState, UserListItem } from '.';

interface Props {
  users: User[];
}

export const UserList = ({ users }: Props) => {
  const onlineUsers = useOnlineUsers();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const router = useRouter();

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.username.toLowerCase().includes(debouncedQuery.toLocaleLowerCase()),
    );
  }, [users, debouncedQuery]);

  const handleCreateChat = async (userId: string) => {
    const res = await chatService.create(userId);
    if (res.success) {
      router.push(`${PRIVATE_ROUTES.CHATS}/${res.data}`);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className="bg-search-section sticky top-0 z-50 w-full -translate-y-1 px-4 py-2">
        <SearchInput
          placeholder="Search users..."
          query={query}
          setQuery={setQuery}
        />
      </div>
      <ul className="bg-search-secttion">
        {filteredUsers.length ? (
          filteredUsers.map(user => (
            <li
              key={user.id}
              className="hover:border-l-sidebar-border hover:bg-secondary/50 border-l-6 border-transparent"
              onClick={() => handleCreateChat(user.id)}
            >
              <UserListItem
                isOnline={!!onlineUsers.find(u => u.id === user.id)}
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
