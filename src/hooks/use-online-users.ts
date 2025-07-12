import { useEffect, useState } from 'react';

import { PUSHER_EVENTS } from '@/constants';
import { pusherClient } from '@/lib/pusher';

export interface OnlineUser {
  id: string;
  email: string;
  username: string;
  avatarColor: string;
  imageUrl: string | null;
  isVerified: boolean;
}

interface PusherPresenceMember {
  id: string;
  info: Omit<OnlineUser, 'id'>;
}

type PusherMembersObject = {
  each: (cb: (member: PusherPresenceMember) => void) => void;
};

export function useOnlineUsers(channelName = 'presence-users') {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(channelName);

    channel.bind(PUSHER_EVENTS.PRESENCE_SUBSCRIBE, (members: PusherMembersObject) => {
      const users: OnlineUser[] = [];
      members.each((member: PusherPresenceMember) => {
        users.push({
          id: member.id,
          ...member.info,
        });
      });
      setOnlineUsers(users);
    });

    channel.bind(PUSHER_EVENTS.PRESENCE_ADD_MEMBER, (member: PusherPresenceMember) => {
      setOnlineUsers(prev => [
        ...prev,
        {
          id: member.id,
          ...member.info,
        },
      ]);
    });

    channel.bind(PUSHER_EVENTS.PRESENCE_REMOVE_MEMBER, (member: PusherPresenceMember) => {
      setOnlineUsers(prev => prev.filter(u => u.id !== member.id));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channelName]);

  return onlineUsers;
}
