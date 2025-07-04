import { getUser } from '@/actions';
import {
  Profile,
  ProfileHeader,
  AccountPreferences,
  AccountManagement,
} from '@/features/profile/components';

async function ProfilePage() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div className="py-4 space-y-4">
      <ProfileHeader />
      <Profile
        username={user.username}
        email={user.email}
        avatarColor={user.avatarColor}
        imageUrl={user.imageUrl}
        isVerified={user.isVerified}
      />
      <AccountPreferences />
      <AccountManagement />
    </div>
  );
}

export default ProfilePage;
