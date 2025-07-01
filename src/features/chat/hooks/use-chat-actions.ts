import { useRouter } from 'next/navigation';
import { chatService } from '@/features/chat/services';
import { PRIVATE_ROUTES } from '@/lib/constants';
import { toast } from 'react-toastify';

export const useChatActions = (chatId: string) => {
  const router = useRouter();

  const deleteChat = async () => {
    try {
      const res = await chatService.delete(chatId);

      if (res.success) {
        router.push(PRIVATE_ROUTES.CHATS);
      } else {
        toast.error('Failed to delete chat!');
      }
    } catch {
      toast.error('Failed to delete chat!');
    }
  };

  const leaveGroup = async () => {
    try {
      const res = await chatService.leaveGroup(chatId);

      if (res.success) {
        router.push(PRIVATE_ROUTES.CHATS);
      } else {
        toast.error('Failed to leave group!');
      }
    } catch {
      toast.error('Failed to leave group!');
    }
  };

  return {
    deleteChat,
    leaveGroup,
  };
};
