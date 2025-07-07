'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BadgeCheckIcon, BadgeX } from 'lucide-react';

interface Props {
  username: string;
  email: string;
  isVerified: boolean;
}

export const UserInfo = ({ username, email, isVerified }: Props) => {
  return (
    <div className="space-y-2">
      <div className="text-center sm:text-left">
        <p className="font-semibold text-sm text-secondary-foreground/80">Display name</p>
        <p className="mt-1 font-semibold text-lg">{username}</p>
      </div>

      <div className="text-center sm:text-left">
        <p className="font-semibold text-sm text-secondary-foreground/80">Display email</p>
        <div className="mt-1 flex flex-col sm:flex-row items-center gap-2">
          <p className="font-semibold">{email}</p>
          <Badge
            variant="secondary"
            className={cn(
              'text-xs rounded-full border w-fit px-2 py-1',
              isVerified
                ? 'bg-green-700/30 text-green-600 border-green-700'
                : 'bg-destructive/10 text-destructive border-destructive',
            )}
          >
            {isVerified ? (
              <BadgeCheckIcon
                size={14}
                strokeWidth={1.7}
              />
            ) : (
              <BadgeX
                size={14}
                strokeWidth={1.7}
              />
            )}
            {isVerified ? 'Verified' : 'Not verified'}
          </Badge>
        </div>
      </div>
    </div>
  );
};
