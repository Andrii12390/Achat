'use client';

import Picker, { EmojiClickData } from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { useState, useRef } from 'react';

import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';
import { useClickOutside } from '@/hooks';

const EMOJI_PICKER_WIDTH = 280;

interface Props {
  onPick: (e: EmojiClickData) => void;
}

export const EmojiPicker = ({ onPick }: Props) => {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setOpen(false));

  const onEmojiClick = (e: EmojiClickData) => {
    onPick(e);
    setOpen(false);
  };

  return (
    <div
      className="relative cursor-pointer"
      ref={pickerRef}
    >
      <button
        className="text-icon hover:text-primary hover:cursor-pointer"
        aria-label="Add emoji"
        onClick={() => setOpen(o => !o)}
      >
        <Smile
          size={ICON_SIZES.MD}
          strokeWidth={ICON_STROKE_WIDTH}
        />
      </button>

      {open && (
        <div className="absolute right-0 bottom-12">
          <Picker
            autoFocusSearch={false}
            width={EMOJI_PICKER_WIDTH}
            onEmojiClick={onEmojiClick}
            className="no-scrollbar"
          />
        </div>
      )}
    </div>
  );
};
