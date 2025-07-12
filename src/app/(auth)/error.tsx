'use client';

import { AlertTriangle, RefreshCw, LogIn } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES } from '@/constants';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function AuthErrorPage({ error, reset }: Props) {
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
          <h1 className="text-foreground text-2xl font-bold sm:text-3xl">Authentication Error</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Something went wrong during authentication. Please try again or return to login.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
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
            asChild
          >
            <Link
              href={PUBLIC_ROUTES.LOGIN}
              className="flex items-center gap-2"
            >
              <LogIn
                size={16}
                strokeWidth={1.7}
              />
              Back to Login
            </Link>
          </Button>
        </div>

        <p className="text-muted-foreground pt-4 text-xs">Error ID: {error.digest || 'Unknown'}</p>
      </section>
    </div>
  );
}

export default AuthErrorPage;
