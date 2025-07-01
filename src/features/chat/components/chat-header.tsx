'use client';

import { DEFAULT_GROUP_IMAGE } from '@/lib/constants';

import Image from 'next/image';

import { MoreVertical, Trash2, LogOut } from 'lucide-react';
import { UserAvatar } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useChatActions } from '@/features/chat/hooks';

interface Props {
  chatId: string;
  title: string;
  avatarColor: string;
  imageUrl: string | null;
  isOnline?: boolean;
  isGroup?: boolean;
}

export const ChatHeader = ({
  chatId,
  title,
  imageUrl,
  avatarColor,
  isOnline = false,
  isGroup = false,
}: Props) => {
  const { deleteChat, leaveGroup } = useChatActions(chatId);

  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-secondary/50 border-b border-border">
      <div className="flex items-center gap-2">
        {isGroup ? (
          <Image
            src={imageUrl ?? DEFAULT_GROUP_IMAGE}
            width={48}
            height={48}
            alt="Group image"
          />
        ) : (
          <UserAvatar
            username={title}
            avatarColor={avatarColor}
            imageUrl={imageUrl}
            isOnline={isOnline}
          />
        )}
        <div>
          <p className="text-base font-semibold">{title}</p>
          {!isGroup && <p className="text-primary text-xs">{isOnline ? 'online' : 'offline'}</p>}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 hover:bg-icon-hover text-icon hover:text-icon-accent rounded-md cursor-pointer">
          <MoreVertical
            size={20}
            strokeWidth={1.7}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10">
          <DropdownMenuLabel>Chat Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2 items-center text-destructive hover:bg-destructive"
            onClick={deleteChat}
          >
            <Trash2
              className="text-destructive"
              size={24}
              strokeWidth={1.7}
            />
            <span>Delete chat</span>
          </DropdownMenuItem>
          {isGroup && (
            <DropdownMenuItem
              className="flex gap-2 items-center text-destructive hover:bg-destructive"
              onClick={leaveGroup}
            >
              <LogOut
                className="text-destructive"
                size={24}
                strokeWidth={1.7}
              />
              <span>Leave group</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
