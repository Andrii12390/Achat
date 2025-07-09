'use client';

import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/constants';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function GlobalErrorPage({ error, reset }: Props) {
  return (
    <div className="h-dvh flex items-center justify-center bg-secondary/30 p-4">
      <section className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-20 h-20 mb-8 text-destructive">
          <AlertTriangle
            size={80}
            className="animate-pulse"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            An unexpected error occurred. Please try again or return to the Home page
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

        <p className="text-xs text-muted-foreground pt-4">Error ID: {error.digest || 'Unknown'}</p>
      </section>
    </div>
  );
}

export default GlobalErrorPage;
