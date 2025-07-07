import { getUser } from '@/actions';
import { getChat } from '@/features/chat/actions';

import { ChatFooter, MessageList, ChatHeader } from '@/features/chat/components';
import { getChatDisplayData } from '@/features/chat/lib/utils';

async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;

  const [chat, user] = await Promise.all([getChat(chatId), getUser()]);

  if (!user || !chat) return <div>Chat not found</div>;

  const displayData = getChatDisplayData(chat, user);

  return (
    <section className="w-full h-full flex flex-col">
      <ChatHeader
        userId={displayData.userId!}
        chatId={chatId}
        title={displayData.title}
        imageUrl={displayData.imageUrl}
        avatarColor={displayData.avatarColor}
        isGroup={chat.isGroup}
      />

      <div className="flex-1 overflow-hidden">
        {chat.messages && (
          <MessageList
            chatId={chat.id!}
            userId={user.id}
            initialMessages={chat.messages}
          />
        )}
      </div>

      <ChatFooter chatId={chatId} />
    </section>
  );
}

export default ChatPage;
