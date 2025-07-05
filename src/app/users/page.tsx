import { Header, Menubar } from '@/components';
import { getUsers } from '@/features/user/actions';
import { UserList } from '@/features/user/components';
import { User } from 'lucide-react';

async function UsersPage() {
  const users = (await getUsers()) ?? [];

  return (
    <main className="h-screen flex">
      <section className="shrink-0 flex flex-col border-r border-border overflow-hidden w-80 bg-secondary/20 shadow-lg">
        <div className="flex-1">
          <Header />
          <UserList users={users} />
        </div>
        <Menubar />
      </section>

      <section className="w-full bg-secondary/30 flex flex-col items-center justify-center gap-3">
        <div className="p-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
          <User
            size={56}
            className="bg-gradient-to-r text-indigo-400 opacity-60"
          />
        </div>
        <h3 className="text-2xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
          Find new friends
        </h3>
        <p className="text-muted-foreground text-lg">Click on someone to start messaging</p>
      </section>
    </main>
  );
}

export default UsersPage;
