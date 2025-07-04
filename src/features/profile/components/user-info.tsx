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
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-sm text-secondary-foreground/80">Display name</p>
        <p className="mt-1 font-semibold">{username}</p>
      </div>
      <div>
        <p className="font-semibold text-sm text-secondary-foreground/80">Display email</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="font-semibold">{email}</p>
          <Badge
            variant="secondary"
            className={cn(
              'text-xs rounded-full border',
              isVerified
                ? 'bg-green-700/30 text-green-600 border border-green-700'
                : 'bg-destructive/10 text-destructive border-destructive',
            )}
          >
            {isVerified ? (
              <BadgeCheckIcon
                size={20}
                strokeWidth={1.7}
              />
            ) : (
              <BadgeX
                size={20}
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
