import { getUser } from '@/actions';
import { Header, Menubar } from '@/components';
import { getChats } from '@/features/chat/actions';
import { ChatLayout, ChatList } from '@/features/chat/components';

async function layout({ children }: { children: React.ReactNode }) {
  const [user, chats] = await Promise.all([getUser(), getChats()]);

  if (!user?.email || !chats) return <div>Chats not found</div>;

  const sidebarContent = (
    <>
      <Header />
      <div className="bg-secondary/30 flex-1 overflow-y-scroll no-scrollbar">
        <ChatList
          initialChats={chats}
          userEmail={user.email}
        />
      </div>
      <Menubar />
    </>
  );

  return <ChatLayout sidebar={sidebarContent}>{children}</ChatLayout>;
}

export default layout;
