import { api } from '@/lib/api';
import { type ExtendedMessage } from '@/types';

interface CreateTextMessagePayload {
  chatId: string;
  text: string;
}

interface CreateImageMessagePayload {
  chatId: string;
  formData: FormData;
}

interface DeleteMessagePayload {
  chatId: string;
  messageId: string;
}

export const messageService = {
  sendText: ({ chatId, text }: CreateTextMessagePayload) =>
    api.post<ExtendedMessage, Omit<CreateTextMessagePayload, 'chatId'>>(`/chat/${chatId}/message`, {
      text,
    }),
  sendImage: ({ chatId, formData }: CreateImageMessagePayload) =>
    api.post<ExtendedMessage, FormData>(`/chat/${chatId}/message`, formData, {
      headers: {
        'Content-Type': undefined,
      },
    }),
  delete: ({ chatId, messageId }: DeleteMessagePayload) =>
    api.delete<Omit<DeleteMessagePayload, 'chatId'>>(`/chat/${chatId}/message/${messageId}`),
};
