'use client';

import { Paperclip, Send } from 'lucide-react';

import { EmojiPicker } from '@/components';
import { Input } from '@/components/ui/input';
import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';
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
    <footer className="bg-secondary/50 border-border relative border-t p-4">
      <button
        className="hover:text-primary text-icon absolute top-8 left-8 cursor-pointer"
        onClick={onAttachClick}
      >
        <Paperclip
          size={ICON_SIZES.MD}
          strokeWidth={ICON_STROKE_WIDTH}
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
        className="bg-secondary/70 rounded-xl border-none py-6.5 pr-24 pl-12"
        style={{ fontSize: '18px' }}
        placeholder="Type a message..."
      />

      <div className="hover:text-primary absolute top-8 right-21">
        <EmojiPicker onPick={addEmoji} />
      </div>

      <button
        disabled={!text.trim() || isSending}
        onClick={sendMessage}
        className="bg-primary absolute top-6 right-9 cursor-pointer rounded-lg p-2 text-white transition-colors hover:opacity-90 disabled:opacity-50"
      >
        <Send
          size={ICON_SIZES.MD}
          strokeWidth={ICON_STROKE_WIDTH}
        />
      </button>
    </footer>
  );
};
