'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const ProfileHeader = () => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  const handleLogOut = () => signOut();

  return (
    <header className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button
          className="p-2 rounded-md h-fit text-icon hover:text-icon-accent hover:bg-icon-hover transition-colors duration-200 cursor-pointer"
          onClick={handleGoBack}
        >
          <ChevronLeft
            size={24}
            strokeWidth={1.7}
          />
        </button>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground ">Profile</h1>
          <p className="text-sm text-secondary-foreground">
            Manage your profile and preferences here
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        className="text-secondary-foreground/80 transition-colors duration-200 cursor-pointer"
        onClick={handleLogOut}
      >
        <LogOut
          size={24}
          strokeWidth={1.7}
        />
        <span>Log out</span>
      </Button>
    </header>
  );
};
