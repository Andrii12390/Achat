'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/constants';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function GlobalErrorPage({ error, reset }: Props) {
  return (
    <div className="bg-secondary/30 flex h-dvh items-center justify-center p-4">
      <section className="max-w-md space-y-6 text-center">
        <div className="text-destructive mx-auto mb-8 h-20 w-20">
          <AlertTriangle
            size={80}
            className="animate-pulse"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-foreground text-2xl font-bold sm:text-3xl">Something went wrong</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            An unexpected error occurred. Please try again or return to the Home page
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
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

          <Button variant="outline">
            <Link
              href={PRIVATE_ROUTES.CHATS}
              className="flex items-center gap-2"
            >
              <Home
                size={16}
                strokeWidth={1.7}
              />
              Go Home
            </Link>
          </Button>
        </div>

        <p className="text-muted-foreground pt-4 text-xs">Error ID: {error.digest || 'Unknown'}</p>
      </section>
    </div>
  );
}

export default GlobalErrorPage;
