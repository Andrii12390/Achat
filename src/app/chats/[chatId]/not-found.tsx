import { PRIVATE_ROUTES } from '@/constants';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

function ChatNotFoundPage() {
  return (
    <div className="h-full pt-[25dvh] flex justify-center bg-secondary/30">
      <section className="container text-center space-y-6 max-w-md">
        <div className="relative mx-auto w-24 h-24 mb-8">
          <MessageCircle
            size={96}
            className="text-muted-foreground/30 animate-pulse"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground/50">?</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Chat not found</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            The chat you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
        </div>

        <Link
          className="w-fit mx-auto text-lg group flex gap-2 items-center border-b border-transparent hover:border-foreground"
          href={PRIVATE_ROUTES.CHATS}
        >
          <span>Back to Chats</span>
          <ArrowRight
            size={20}
            strokeWidth={1.7}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </section>
    </div>
  );
}

export default ChatNotFoundPage;
