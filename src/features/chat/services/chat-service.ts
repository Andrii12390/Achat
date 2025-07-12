import { Chat } from '@prisma/client';

import { api } from '@/lib/api';

export const chatService = {
  create: (userId: string) => api.post<string, { userId: string }>(`/chat`, { userId }),
  getAll: () => api.get<Chat[]>('/chat'),
  delete: (chatId: string) => api.delete<string>(`/chat/${chatId}`),
};
