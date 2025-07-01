import { api } from '@/lib/api';
import { type ExtendedMessage } from '@/types';

interface CreateMessagePayload {
  chatId: string;
  text: string | null;
  imageUrl: string | null;
}

interface DeleteMessagePayload {
  chatId: string;
  messageId: string;
}

export const messageService = {
  create: ({ chatId, text, imageUrl }: CreateMessagePayload) =>
    api.post<ExtendedMessage, Omit<CreateMessagePayload, 'chatId'>>(`/chat/${chatId}/message`, {
      text,
      imageUrl,
    }),
  delete: ({ chatId, messageId }: DeleteMessagePayload) =>
    api.delete<Omit<DeleteMessagePayload, 'chatId'>>(`/chat/${chatId}/message/${messageId}`),
};
