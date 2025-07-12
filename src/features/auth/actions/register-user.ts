'use server';

import bcrypt from 'bcrypt';

import { getRandomAvatarColor } from '@/features/auth/lib/utils';
import { prisma } from '@/lib/prisma';

interface UserPayload {
  email: string;
  username: string;
  password?: string;
  imageUrl?: string;
  isVerified?: boolean;
}

export async function registerUser({
  email,
  username,
  password,
  imageUrl,
  isVerified = false,
}: UserPayload) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    await prisma.user.create({
      data: {
        email,
        username,
        avatarColor: getRandomAvatarColor(),
        password: hashedPassword,
        isVerified,
        imageUrl,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
