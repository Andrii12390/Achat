'use client';

interface Props {
  username: string;
  email: string;
}

export const UserInfo = ({ username, email }: Props) => {
  return (
    <div className="space-y-2">
      <div className="text-center sm:text-left">
        <p className="font-semibold text-sm text-secondary-foreground/80">Display name</p>
        <p className="mt-1 font-semibold text-lg">{username}</p>
      </div>

      <div className="text-center sm:text-left">
        <p className="font-semibold text-sm text-secondary-foreground/80">Display email</p>
        <p className="mt-1 font-semibold text-lg">{email}</p>
      </div>
    </div>
  );
};
