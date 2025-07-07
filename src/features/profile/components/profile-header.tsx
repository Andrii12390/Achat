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
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              className="p-2 hover:bg-icon-hover text-icon hover:text-icon-accent rounded-md cursor-pointer transition-colors duration-200"
              onClick={handleGoBack}
            >
              <ChevronLeft
                size={24}
                strokeWidth={1.7}
              />
            </button>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Profile</h1>
              <p className="hidden sm:block text-sm text-muted-foreground">
                Manage your profile and preferences here
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-all duration-200 cursor-pointer"
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
