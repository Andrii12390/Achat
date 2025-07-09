'use client';

import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/constants';
import { MessageCircleX, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function ChatErrorPage({ error, reset }: Props) {
  return (
    <div className="h-dvh flex items-center justify-center bg-background p-4">
      <section className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-20 h-20 mb-8 text-destructive">
          <MessageCircleX
            size={80}
            className="animate-pulse"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Chat Error</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Failed to load this chat. It might be deleted or you have no access to it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 items-center justify-center">
          <Button
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RefreshCw
              size={16}
              strokeWidth={1.7}
            />
            Try Again
          </Button>

          <Button
            variant="outline"
            className="flex sm:hidden items-center gap-2"
            asChild
          >
            <Link href={PRIVATE_ROUTES.CHATS}>
              <ArrowLeft
                size={16}
                strokeWidth={1.7}
              />
              Back to Chats
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-4">Error ID: {error.digest || 'Unknown'}</p>
      </section>
    </div>
  );
}

export default ChatErrorPage;
