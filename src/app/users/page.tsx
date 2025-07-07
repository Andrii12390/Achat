import { Header, Menubar } from '@/components';
import { getUsers } from '@/features/user/actions';
import { UserList } from '@/features/user/components';
import { User } from 'lucide-react';

async function UsersPage() {
  const users = (await getUsers()) ?? [];

  return (
    <main className="h-dvh flex">
      <section className="w-full shrink-0 flex flex-col border-r border-border overflow-hidden sm:w-64 md:w-80 lg:w-84 shadow-lg">
        <Header />
        <div className="flex-1 overflow-y-scroll no-scrollbar">
          <UserList users={users} />
        </div>
        <Menubar />
      </section>

      <section className="hidden w-full bg-secondary/30 sm:flex flex-col items-center justify-center gap-3">
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
