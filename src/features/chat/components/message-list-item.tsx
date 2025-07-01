import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn, formatMessageDate } from '@/lib/utils';

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
                width={150}
                height={150}
              />
            )}
            <p className="mt-1 text-xs text-secondary-foreground">{formatMessageDate(createdAt)}</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="bg-destructive/10 text-destructive"
            onClick={handleDelete}
          >
            Delete message
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </li>
  );
};
