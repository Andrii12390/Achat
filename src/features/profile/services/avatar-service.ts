import { api } from '@/lib/api';

export const avatarService = {
  upload: (formData: FormData) =>
    api.post<string, FormData>('/user/avatar', formData, {
      headers: {
        'Content-Type': undefined,
      },
    }),
  delete: () => api.delete<null>('/user/avatar'),
};
