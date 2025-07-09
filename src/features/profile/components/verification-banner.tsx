'use client';

import { Button } from '@/components/ui/button';
import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PUBLIC_ROUTES } from '@/constants';

interface Props {
  email: string;
}

export const VerificationBanner = ({ email }: Props) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <section className="relative bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X
            size={16}
            strokeWidth={1.7}
          />
        </button>

        <div className="flex items-start gap-4 pr-8 sm:pr-10">
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                Email Verification
              </h3>
              <p className="text-sm text-muted-foreground">
                Your account <span className="font-medium text-foreground">{email}</span> needs to
                be verified to access all features.
              </p>
            </div>

            <Link href={PUBLIC_ROUTES.VERIFICATION}>
              <Button
                className="group"
                variant="outline"
              >
                Verify email
                <ArrowRight
                  size={14}
                  strokeWidth={1.7}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
