import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn, formatMessageDate } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

import Image from 'next/image';

interface Props {
  isSender: boolean;
  text: string | null;
  imageUrl: string | null;
  createdAt: Date;
  handleDelete: () => void;
}

export const MessageListItem = ({ isSender, text, imageUrl, createdAt, handleDelete }: Props) => {
  return (
    <li className="mt-2">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={cn(
              'w-fit px-4 py-2 rounded-2xl shadow-sm ',
              isSender
                ? 'bg-primary-message rounded-br-md ml-auto'
                : 'bg-secondary rounded-bl-md mr-auto',
            )}
          >
            {text ? (
              <p className="text-sm">{text}</p>
            ) : (
              <Image
                src={imageUrl!}
                alt="Message with image"
                sizes="25vw"
                className="w-full h-auto"
                width={250}
                height={250}
              />
            )}
            <p className="mt-1 text-xs text-secondary-foreground">{formatMessageDate(createdAt)}</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="hover:bg-destructive/10 text-destructive !hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2
              className="text-destructive"
              size={24}
              strokeWidth={1.7}
            />
            <span>Delete Message</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </li>
  );
};
