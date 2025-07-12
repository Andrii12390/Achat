'use client';

import { MoreVertical, Trash2, LogOut, ChevronLeft, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { UserAvatar } from '@/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEFAULT_GROUP_IMAGE, PRIVATE_ROUTES } from '@/constants';
import { useChatActions } from '@/features/chat/hooks';
import { useOnlineUsers } from '@/hooks/use-online-users';

import { EditGroupModal } from './edit-group-modal';

interface Props {
  userId: string | null;
  chatId: string;
  title: string;
  avatarColor: string;
  imageUrl: string | null;
  isGroup?: boolean;
}

export const ChatHeader = ({
  userId,
  chatId,
  title,
  imageUrl,
  avatarColor,
  isGroup = false,
}: Props) => {
  const onlineUsers = useOnlineUsers();

  const { deleteChat, leaveGroup } = useChatActions(chatId);

  const [isOpenGroupModal, setIsOpenGroupModal] = useState(false);

  const isOnline = !!onlineUsers.find(u => u.id === userId);

  return (
    <header className="bg-secondary/50 border-border flex w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Link
          href={PRIVATE_ROUTES.CHATS}
          className="hover:bg-icon-hover text-icon hover:text-icon-accent cursor-pointer rounded-md p-2 transition-colors duration-200 sm:hidden"
        >
          <ChevronLeft
            size={20}
            strokeWidth={1.7}
          />
        </Link>
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
        <DropdownMenuTrigger className="hover:bg-icon-hover text-icon hover:text-icon-accent cursor-pointer rounded-md p-2">
          <MoreVertical
            size={20}
            strokeWidth={1.7}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10">
          <DropdownMenuLabel className="text-secondary-foreground">Chat Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:bg-destructive flex items-center gap-2"
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
            <>
              <DropdownMenuItem
                className="text-destructive hover:bg-destructive flex items-center gap-2"
                onClick={leaveGroup}
              >
                <LogOut
                  className="text-destructive"
                  size={24}
                  strokeWidth={1.7}
                />
                <span>Leave group</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => setIsOpenGroupModal(true)}
              >
                <Edit
                  size={24}
                  className="text-foreground"
                  strokeWidth={1.7}
                />
                <span>Edit Group</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <EditGroupModal
        isOpen={isOpenGroupModal}
        group={{
          id: chatId,
          name: title,
          imageUrl,
          avatarColor,
        }}
        onClose={() => setIsOpenGroupModal(false)}
      />
    </header>
  );
};
