import { api } from '@/lib/api';
import { Chat } from '@prisma/client';

export const chatService = {
  create: (userId: string) => api.post<string, { userId: string }>(`/chat`, { userId }),
  createGroup: (userIds: string[], title: string) =>
    api.post<string, { userIds: string[]; title: string }>(`/chat`, { userIds, title }),
  getAll: () => api.get<Chat[]>('/chat'),
};
