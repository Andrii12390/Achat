'use client';

import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';
import { UserMultiSelect } from '@/features/user/components';
import { useGroupChatForm } from '@/hooks';
import { User } from '@/types';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  users: User[];
}

export const GroupChatDialog = ({ users }: Props) => {
  const {
    isOpen,
    setIsOpen,
    isPending,
    title,
    setTitle,
    selectedUsers,
    setSelectedUsers,
    errors,
    handleCreate,
  } = useGroupChatForm();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <button className="text-icon hover:bg-icon-hover hover:text-icon-accent cursor-pointer gap-1 rounded-md p-2">
          <Plus
            size={ICON_SIZES.LG}
            strokeWidth={ICON_STROKE_WIDTH}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Group Chat</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Group Name</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter group name..."
              disabled={isPending}
              aria-invalid={!!errors.title}
            />
            {errors.title && <p className="text-destructive text-xs">{errors.title}</p>}
          </div>
          <div className="space-y-2">
            <Label>Select Members ({selectedUsers.length} selected)</Label>
            <UserMultiSelect
              users={users}
              selectedUsers={selectedUsers}
              onSelectionChange={setSelectedUsers}
            />
            {errors.users && <p className="text-destructive text-xs">{errors.users}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Group'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
