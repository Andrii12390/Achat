'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ICON_SIZES, ICON_STROKE_WIDTH, PRIVATE_ROUTES } from '@/constants';

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
            size={ICON_SIZES['4XL']}
            strokeWidth={ICON_STROKE_WIDTH}
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
              size={ICON_SIZES.SM}
              strokeWidth={ICON_STROKE_WIDTH}
            />
            Try Again
          </Button>

          <Button variant="outline">
            <Link
              href={PRIVATE_ROUTES.CHATS}
              className="flex items-center gap-2"
            >
              <Home
                size={ICON_SIZES.SM}
                strokeWidth={ICON_STROKE_WIDTH}
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
