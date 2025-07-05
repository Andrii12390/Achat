import { GroupChatDialog } from '@/components/';
import { getUsers } from '@/features/user/actions';

export const Header = async () => {
  const users = (await getUsers()) ?? [];
  return (
    <header className="flex justify-between items-center px-4 py-3 select-none">
      <h2 className="text-3xl italic font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        AChat
      </h2>

      <GroupChatDialog users={users} />
    </header>
  );
};
