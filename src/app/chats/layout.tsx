import { Header, Menubar } from '@/components';
import { getChats } from '@/features/chat/actions';
import { ChatList } from '@/features/chat/components';

async function layout({ children }: { children: React.ReactNode }) {
  const chats = await getChats();

  return (
    <main className="h-screen flex">
      <section className="shrink-0 flex flex-col border-r border-border overflow-hidden w-80 shadow-lg">
        <div className="bg-secondary/30 flex-1">
          <Header />
          {chats && <ChatList chats={chats} />}
        </div>
        <Menubar />
      </section>
      {children}
    </main>
  );
}

export default layout;
