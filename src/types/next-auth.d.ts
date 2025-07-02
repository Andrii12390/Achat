import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      avatarColor: string;
      imageUrl: string | null;
      isVerified: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    username: string;
    avatarColor: string;
    isVerified: boolean;
    imageUrl: string | null;
  }
}
