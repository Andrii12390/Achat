'use client';

import { Input } from '@/components/ui/input';
import { EmojiPicker } from '@/components';

import { Paperclip, Send } from 'lucide-react';

import { useMessageComposer } from '@/features/chat/hooks';

interface Props {
  chatId: string;
}

export const ChatFooter = ({ chatId }: Props) => {
  const {
    text,
    setText,
    isSending,
    fileInputRef,
    onAttachClick,
    onFileChange,
    sendMessage,
    addEmoji,
    onKeyDown,
  } = useMessageComposer(chatId);

  return (
    <footer className="relative p-4 bg-secondary/50 border-t border-border">
      <button
        className="absolute top-8 left-8 hover:text-primary text-icon cursor-pointer"
        onClick={onAttachClick}
      >
        <Paperclip
          strokeWidth={1.7}
          size={20}
        />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={onFileChange}
        disabled={isSending}
      />

      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKeyDown}
        className="py-6.5 pl-12 pr-24 border-none bg-secondary/70  rounded-xl"
        style={{ fontSize: '18px' }}
        placeholder="Type a message..."
      />

      <div className="absolute top-8 right-21 hover:text-primary ">
        <EmojiPicker onPick={addEmoji} />
      </div>

      <button
        disabled={!text.trim() || isSending}
        onClick={sendMessage}
        className="absolute top-6 right-9 transition-colors bg-primary text-white rounded-lg p-2 disabled:opacity-50 hover:opacity-90 cursor-pointer"
      >
        <Send
          strokeWidth={1.7}
          size={20}
        />
      </button>
    </footer>
  );
};
