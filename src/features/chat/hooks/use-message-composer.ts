import { type EmojiClickData } from 'emoji-picker-react';
import { useRef, useState, useCallback } from 'react';

import { messageService } from '@/features/chat/services';

export const useMessageComposer = (chatId: string) => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onAttachClick = () => fileInputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsSending(true);

    await messageService.sendImage({ chatId, formData });

    setIsSending(false);
    e.target.value = '';
  };

  const sendMessage = useCallback(async () => {
    const trimmedText = text.trim();

    if (isSending || !trimmedText) return;

    setIsSending(true);

    await messageService.sendText({ chatId, text: trimmedText });

    setText('');
    setIsSending(false);
  }, [chatId, text, isSending]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addEmoji = (e: EmojiClickData) => setText(p => p + e.emoji);

  return {
    text,
    setText,
    isSending,
    fileInputRef,
    onAttachClick,
    onFileChange,
    sendMessage,
    onKeyDown,
    addEmoji,
  };
};
