import { MessageCircle } from 'lucide-react';

function ChatPage() {
  return (
    <section className="bg-secondary/30 flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6">
        <MessageCircle
          size={56}
          className="bg-gradient-to-r text-indigo-400 opacity-60"
        />
      </div>
      <h3 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
        Select a chat
      </h3>
      <p className="text-muted-foreground text-lg">Select a chat from the list in the left menu</p>
    </section>
  );
}

export default ChatPage;
