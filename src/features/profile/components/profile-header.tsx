'use client';

import { ChevronLeft, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export const ProfileHeader = () => {
  const router = useRouter();

  const handleGoBack = () => router.back();

  const handleLogOut = () => signOut();

  return (
    <header className="bg-background/80 border-border/50 sticky top-0 z-10 border-b backdrop-blur-md">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              className="hover:bg-icon-hover text-icon hover:text-icon-accent cursor-pointer rounded-md p-2 transition-colors duration-200"
              onClick={handleGoBack}
            >
              <ChevronLeft
                size={24}
                strokeWidth={1.7}
              />
            </button>

            <div className="space-y-1">
              <h1 className="text-foreground text-xl font-bold sm:text-2xl">Profile</h1>
              <p className="text-muted-foreground hidden text-sm sm:block">
                Manage your profile and preferences here
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-destructive hover:border-destructive/50 cursor-pointer transition-all duration-200"
            onClick={handleLogOut}
          >
            <LogOut
              size={16}
              strokeWidth={1.7}
            />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
