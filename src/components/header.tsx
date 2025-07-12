import { GroupChatDialog } from '@/components/';
import { getUsers } from '@/features/user/actions';

export const Header = async () => {
  const users = (await getUsers()) ?? [];
  return (
    <header className="bg-secondary/30 flex items-center justify-between px-4 py-3 select-none">
      <h1 className="logo-glow text-logo text-2xl font-extrabold">AChat</h1>

      <GroupChatDialog users={users} />
    </header>
  );
};
