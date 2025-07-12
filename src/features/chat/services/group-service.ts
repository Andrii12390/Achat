import { api } from '@/lib/api';

export const groupService = {
  create: (userIds: string[], title: string) =>
    api.post<string, { userIds: string[]; title: string }>(`/chat`, { userIds, title }),
  leave: (chatId: string) => api.post<null, null>(`/chat/${chatId}/leave`),
  update: (chatId: string, formData: FormData) =>
    api.patch<null, FormData>(`/chat/${chatId}`, formData, {
      headers: {
        'Content-Type': undefined,
      },
    }),
};
