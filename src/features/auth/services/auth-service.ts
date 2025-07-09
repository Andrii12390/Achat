import { api } from '@/lib/api';

export const authService = {
  sendCode: () => api.post<null, null>('/auth/verification'),
  verifyCode: (code: string) => api.patch<null, { code: string }>('/auth/verification', { code }),
};
