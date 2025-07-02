import { api } from '@/lib/api';
import { User } from '@/types';

export const userService = {
  getAll: () => api.get<User>('/user'),
  delete: () => api.delete<User>('/user'),
};
