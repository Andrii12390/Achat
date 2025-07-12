'use client';

import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PRIVATE_ROUTES } from '@/constants';

interface Props {
  email: string;
}

export const VerificationBanner = ({ email }: Props) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6">
      <section className="bg-card border-border relative rounded-xl border p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
        <button
          onClick={() => setIsDismissed(true)}
          className="hover:bg-secondary text-muted-foreground hover:text-foreground absolute top-3 right-3 rounded-full p-1.5 transition-colors sm:top-4 sm:right-4"
        >
          <X
            size={16}
            strokeWidth={1.7}
          />
        </button>

        <div className="flex items-start gap-4 pr-8 sm:pr-10">
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-foreground mb-1 text-sm font-semibold sm:text-base">
                Email Verification
              </h3>
              <p className="text-muted-foreground text-sm">
                Your account <span className="text-foreground font-medium">{email}</span> needs to
                be verified to access all features.
              </p>
            </div>

            <Link href={PRIVATE_ROUTES.VERIFICATION}>
              <Button
                className="group"
                variant="outline"
              >
                Verify email
                <ArrowRight
                  size={14}
                  strokeWidth={1.7}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
