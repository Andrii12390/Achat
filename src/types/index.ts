import type {
  Chat as PrismaChat,
  ChatRole,
  User as PrismaUser,
  Message as PrismaMessage,
} from '@prisma/client';

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
  status: number;
};

export type User = Pick<PrismaUser, 'id' | 'username' | 'email' | 'imageUrl' | 'avatarColor'>;

export type Message = Pick<PrismaMessage, 'id' | 'text' | 'imageUrl' | 'createdAt' | 'senderId'>;

export type Chat = Pick<PrismaChat, 'id' | 'isGroup' | 'imageUrl' | 'lastMessageAt' | 'title'> & {
  avatarColor: string | null;
  messages: Message[];
  participants: Array<{
    role: ChatRole;
    userId: string;
    user: {
      id: string;
      avatarColor: string;
      username: string;
      imageUrl: string | null;
    };
  }>;
};

export type ExtendedMessage = Message & {
  sender: {
    id: string;
    username: string;
    avatarColor: string;
    email: string;
    imageUrl: string | null;
  };
};

export type Theme = 'dark' | 'light' | 'system';
