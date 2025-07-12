import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { PRIVATE_ROUTES } from '@/constants';

function ChatNotFoundPage() {
  return (
    <div className="bg-secondary/30 flex h-full justify-center pt-[25dvh]">
      <section className="container max-w-md space-y-6 text-center">
        <div className="relative mx-auto mb-8 h-24 w-24">
          <MessageCircle
            size={96}
            className="text-muted-foreground/30 animate-pulse"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground/50 text-2xl font-bold">?</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-foreground text-2xl font-bold sm:text-3xl">Chat not found</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            The chat you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
        </div>

        <Link
          className="group hover:border-foreground mx-auto flex w-fit items-center gap-2 border-b border-transparent text-lg"
          href={PRIVATE_ROUTES.CHATS}
        >
          <span>Back to Chats</span>
          <ArrowRight
            size={20}
            strokeWidth={1.7}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </section>
    </div>
  );
}

export default ChatNotFoundPage;
