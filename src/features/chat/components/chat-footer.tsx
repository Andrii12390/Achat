'use client';

import { useState, useCallback } from 'react';

import { messageService } from '@/features/chat/services';

import { Input } from '@/components/ui/input';
import { EmojiPicker } from '@/components';

import { Paperclip, Send } from 'lucide-react';

import { type EmojiClickData } from 'emoji-picker-react';

interface Props {
  chatId: string;
}

export const ChatFooter = ({ chatId }: Props) => {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const sendMessage = useCallback(async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      await messageService.create({ chatId, text: text.trim(), imageUrl: null });
      setText('');
    } finally {
      setSending(false);
    }
  }, [chatId, text]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addEmoji = (e: EmojiClickData) => setText(p => p + e.emoji);

  return (
    <footer className="relative px-6 py-4 bg-secondary/50 border-t border-border">
      <button className="absolute top-8 left-10 hover:text-primary text-icon cursor-pointer">
        <Paperclip
          strokeWidth={1.7}
          size={20}
        />
      </button>

      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKeyDown}
        className="py-6.5 pl-12 pr-24 border-none bg-secondary/70  rounded-xl"
        style={{ fontSize: '18px' }}
        placeholder="Type a message..."
      />

      <div className="absolute top-8 right-22 hover:text-primary ">
        <EmojiPicker onPick={addEmoji} />
      </div>

      <button
        disabled={!text.trim() || sending}
        onClick={sendMessage}
        className="absolute top-6 right-10 transition-colors bg-primary text-white rounded-lg p-2 disabled:opacity-50 hover:opacity-90 cursor-pointer"
      >
        <Send
          strokeWidth={1.7}
          size={20}
        />
      </button>
    </footer>
  );
};
