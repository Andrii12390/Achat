import { GroupChatDialog } from '@/components/';
import { getUsers } from '@/features/user/actions';

export const Header = async () => {
  const users = (await getUsers()) ?? [];
  return (
    <header className="bg-secondary/30 flex items-center justify-between px-4 py-3 select-none">
      <h2 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent italic">
        AChat
      </h2>

      <GroupChatDialog users={users} />
    </header>
  );
};
