'use client';

import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useState } from 'react';

import { UserAvatar } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type User } from '@/types';

interface Props {
  users: User[];
  selectedUsers: User[];
  onSelectionChange: (users: User[]) => void;
}

export const UserMultiSelect = ({ users, selectedUsers, onSelectionChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (user: User) => {
    const isSelected = selectedUsers.some(u => u.id === user.id);

    if (isSelected) {
      onSelectionChange(selectedUsers.filter(u => u.id !== user.id));
    } else {
      onSelectionChange([...selectedUsers, user]);
    }
  };

  const handleRemove = (userId: string) => {
    onSelectionChange(selectedUsers.filter(u => u.id !== userId));
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={isOpen}
          className="h-auto min-h-[2.5rem] w-full justify-between p-2"
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {!selectedUsers.length ? (
              <span className="text-muted-foreground">Select users</span>
            ) : (
              selectedUsers.map(user => (
                <Badge
                  key={user.id}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  <UserAvatar
                    avatarColor={user.avatarColor}
                    isOnline={false}
                    imageUrl={user.imageUrl}
                    username={user.username}
                    size="sm"
                  />
                  <span className="text-xs">{user.username}</span>
                  <span
                    className="hover:bg-muted flex h-4 w-4 cursor-pointer items-center justify-center rounded"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemove(user.id);
                    }}
                    role="button"
                    aria-label={`Remove ${user.username}`}
                  >
                    <X size={12} />
                  </span>
                </Badge>
              ))
            )}
          </div>
          <ChevronsUpDown
            size={16}
            className="ml-2 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search users..." />
          <CommandEmpty>No users found</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {users.map(user => (
              <CommandItem
                key={user.id}
                onSelect={() => handleSelect(user)}
                className="flex items-center gap-2"
              >
                <UserAvatar
                  avatarColor={user.avatarColor}
                  isOnline={false}
                  imageUrl={user.imageUrl}
                  username={user.username}
                  size="sm"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.username}</p>
                </div>
                <Check
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedUsers.some(u => u.id === user.id) ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
