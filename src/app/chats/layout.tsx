import { getUser } from '@/actions';
import { Header, Menubar } from '@/components';
import { getChats } from '@/features/chat/actions';
import { ChatList } from '@/features/chat/components';

async function layout({ children }: { children: React.ReactNode }) {
  const [user, chats] = await Promise.all([getUser(), getChats()]);

  if (!user || !chats) return <div>Chats not found</div>;

  return (
    <main className="h-screen flex">
      <section className="shrink-0 flex flex-col border-r border-border overflow-hidden w-80 shadow-lg">
        <div className="bg-secondary/30 flex-1">
          <Header />
          <ChatList
            initialChats={chats}
            userEmail={user.email}
          />
        </div>
        <Menubar />
      </section>
      {children}
    </main>
  );
}

export default layout;
