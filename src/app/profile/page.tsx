import { Metadata } from 'next';

import { getUser } from '@/actions';
import {
  Profile,
  ProfileHeader,
  AccountPreferences,
  AccountManagement,
} from '@/features/profile/components';
import { VerificationBanner } from '@/features/profile/components/verification-banner';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your AChat profile information.',
};

export const dynamic = 'force-dynamic';

async function ProfilePage() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div className="py-4">
      <ProfileHeader />

      {!user.isVerified && <VerificationBanner email={user.email} />}

      <Profile
        username={user.username}
        email={user.email}
        avatarColor={user.avatarColor}
        imageUrl={user.imageUrl}
      />

      <AccountPreferences />

      <AccountManagement />
    </div>
  );
}

export default ProfilePage;
