'use client';

import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES } from '@/constants';
import { AlertTriangle, RefreshCw, LogIn } from 'lucide-react';
import Link from 'next/link';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function AuthErrorPage({ error, reset }: Props) {
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Authentication Error</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Something went wrong during authentication. Please try again or return to login.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
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

        <p className="text-xs text-muted-foreground pt-4">Error ID: {error.digest || 'Unknown'}</p>
      </section>
    </div>
  );
}

export default AuthErrorPage;
