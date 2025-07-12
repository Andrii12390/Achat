import { User } from 'lucide-react';
import { Metadata } from 'next';

import { Header, Menubar } from '@/components';
import { getUsers } from '@/features/user/actions';
import { UserList } from '@/features/user/components';

export const metadata: Metadata = {
  title: 'Users',
  description:
    'Find new friends and connect with people on AChat. Browse all users and start chatting instantly.',
  openGraph: {
    title: 'Users',
    description: 'Discover the community on AChat. Find friends and connect for instant messaging.',
  },
};

async function UsersPage() {
  const users = (await getUsers()) ?? [];

  return (
    <main className="flex h-dvh">
      <section className="border-border flex w-full shrink-0 flex-col overflow-hidden border-r shadow-lg sm:w-64 md:w-80 lg:w-84">
        <Header />
        <div className="no-scrollbar flex-1 overflow-y-scroll">
          <UserList users={users} />
        </div>
        <Menubar />
      </section>

      <section className="bg-secondary/30 hidden w-full flex-col items-center justify-center gap-3 sm:flex">
        <div className="rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6">
          <User
            size={56}
            className="bg-gradient-to-r text-indigo-400 opacity-60"
          />
        </div>
        <h3 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
          Find new friends
        </h3>
        <p className="text-muted-foreground text-lg">Click on someone to start messaging</p>
      </section>
    </main>
  );
}

export default UsersPage;
