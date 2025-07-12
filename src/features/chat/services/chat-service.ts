import { api } from '@/lib/api';
import { Chat } from '@prisma/client';

export const chatService = {
  create: (userId: string) => api.post<string, { userId: string }>(`/chat`, { userId }),
  getAll: () => api.get<Chat[]>('/chat'),
  delete: (chatId: string) => api.delete<string>(`/chat/${chatId}`),
};
