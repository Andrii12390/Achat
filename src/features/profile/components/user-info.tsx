'use client';

interface Props {
  username: string;
  email: string;
}

export const UserInfo = ({ username, email }: Props) => {
  return (
    <div className="space-y-2">
      <div className="text-center sm:text-left">
        <p className="text-secondary-foreground/80 text-sm font-semibold">Display name</p>
        <p className="mt-1 text-lg font-semibold">{username}</p>
      </div>

      <div className="text-center sm:text-left">
        <p className="text-secondary-foreground/80 text-sm font-semibold">Display email</p>
        <p className="mt-1 text-lg font-semibold">{email}</p>
      </div>
    </div>
  );
};
