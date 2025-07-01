'use server';

import { getUser } from '@/actions';
import { prisma } from '@/lib/prisma';

export const getUsers = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    return prisma.user.findMany({
      omit: {
        password: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: {
          not: user.id,
        },
      },
    });
  } catch {
    return null;
  }
};
