import { UserAvatar } from '@/components';

interface Props {
  username: string;
  avatarColor: string;
  imageUrl: string | null;
  isOnline: boolean;
}

export const UserListItem = ({ username, imageUrl, avatarColor, isOnline = false }: Props) => {
  return (
    <div className="flex items-center gap-3 p-3 cursor-pointer">
      <UserAvatar
        username={username}
        avatarColor={avatarColor}
        imageUrl={imageUrl}
        isOnline={isOnline}
      />
      <span className="text-sm font-medium">{username}</span>
    </div>
  );
};
