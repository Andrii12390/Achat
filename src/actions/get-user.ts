'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export const getUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    return session?.user ? session.user : null;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
