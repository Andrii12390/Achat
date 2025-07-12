import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { PRIVATE_ROUTES } from '@/constants';
import { groupService } from '@/features/chat/services';
import { groupChatSchema, GroupChatInput } from '@/lib/schemas';
import { User } from '@/types';

export const useGroupChatForm = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [title, setTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<{ title?: string; users?: string }>({});

  const validate = () => {
    const data: GroupChatInput = {
      title,
      userIds: selectedUsers.map(u => u.id),
    };
    const parsed = groupChatSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.flatten().fieldErrors;
      setErrors({
        title: issues.title?.[0],
        users: issues.userIds?.[0],
      });
      return false;
    }
    setErrors({});
    return data;
  };

  const handleCreate = async () => {
    setIsPending(true);
    const data = validate();
    if (!data) {
      setIsPending(false);
      return;
    }
    const res = await groupService.create(data.userIds, data.title.trim());
    if (res.success) {
      router.push(`${PRIVATE_ROUTES.CHATS}/${res.data}`);
      setIsOpen(false);
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };

  return {
    isOpen,
    setIsOpen,
    isPending,
    title,
    setTitle,
    selectedUsers,
    setSelectedUsers,
    errors,
    handleCreate,
  };
};
