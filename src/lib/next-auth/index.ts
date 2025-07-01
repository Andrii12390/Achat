import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import { PROVIDERS } from '@/features/auth/lib/constants';
import { registerUser } from '@/features/auth/actions';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: PROVIDERS.CREDENTIALS,
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Missing credentials');

        const existedUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existedUser || !credentials.password) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(credentials.password, existedUser.password!);

        if (!isMatch) throw new Error('Invalid credentials');

        return {
          id: existedUser.id,
          email: existedUser.email,
          username: existedUser.username,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: process.env.TOKEN_MAX_AGE ? +process.env.TOKEN_MAX_AGE : 1000 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user) throw new Error('Missing credentials');

      if (account?.provider === PROVIDERS.GOOGLE || account?.provider === PROVIDERS.GITHUB) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (!existingUser) {
          await registerUser({
            email: user.email!,
            username: user.name!,
            imageUrl: user.image!,
            isVerified: true,
          });
        }
      }
      return true;
    },
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.imageUrl = user.imageUrl;
      }

      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.imageUrl = token.imageUrl;
      }

      return session;
    },
  },
};
