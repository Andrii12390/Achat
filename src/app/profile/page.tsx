import { getUser } from '@/actions';
import {
  ProfileHeader,
  ProfileInfo,
  ProfilePreferences,
  ProfileAccountManagement,
} from '@/features/user/components';

async function ProfilePage() {
  const user = await getUser();

  if (!user) return null;

  return (
    <div className="py-4 space-y-4">
      <ProfileHeader />
      <ProfileInfo
        username={user.username}
        email={user.email}
        avatarColor={user.avatarColor}
        imageUrl={user.imageUrl}
        isVerified={user.isVerified}
      />
      <ProfilePreferences />
      <ProfileAccountManagement />
    </div>
  );
}

export default ProfilePage;
