'use server';

import { prisma } from '@/features/shared/lib/prisma';
import bcrypt from 'bcrypt';

interface IUserPayload {
  email: string;
  username: string;
  password: string;
}

export async function registerUser({ email, username, password }: IUserPayload) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    await prisma.user.create({
      data: {
        email,
        username,
        password: await bcrypt.hash(password, 10),
      },
    });

    return true;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
