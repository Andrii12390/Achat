import { useRouter } from 'next/navigation';
import { chatService } from '@/features/chat/services';
import { PRIVATE_ROUTES } from '@/constants';
import { toast } from 'react-toastify';

export const useChatActions = (chatId: string) => {
  const router = useRouter();

  const deleteChat = async () => {
    const res = await chatService.delete(chatId);

    if (res.success) {
      router.push(PRIVATE_ROUTES.CHATS);
    } else {
      toast.error(res.message);
    }
  };

  const leaveGroup = async () => {
    const res = await chatService.leaveGroup(chatId);

    if (res.success) {
      router.push(PRIVATE_ROUTES.CHATS);
    } else {
      toast.error(res.message);
    }
  };

  return {
    deleteChat,
    leaveGroup,
  };
};
