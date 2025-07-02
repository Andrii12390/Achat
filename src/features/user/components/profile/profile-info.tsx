import { UserAvatar } from '@/components';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BadgeCheckIcon, BadgeX } from 'lucide-react';

interface Props {
  username: string;
  email: string;
  avatarColor: string;
  imageUrl: string | null;
  isVerified: boolean;
}

export const ProfileInfo = ({ username, email, avatarColor, imageUrl, isVerified }: Props) => {
  return (
    <section className="p-8 rounded-lg bg-secondary/30 border shadow-md max-w-4xl mx-auto space-y-4">
      <h2 className="font-semibold text-xl">Personal Info</h2>
      <div className="flex items-center gap-8">
        <UserAvatar
          username={username}
          avatarColor={avatarColor}
          imageUrl={imageUrl}
          size={'xl'}
        />
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
      </div>
    </section>
  );
};
