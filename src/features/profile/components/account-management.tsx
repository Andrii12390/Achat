'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

import { userService } from '@/features/user/services';

import { signOut } from 'next-auth/react';

export const AccountManagement = () => {
  const handleDelete = async () => {
    const res = await userService.delete();

    if (!res.success) {
      toast.error('Failed to delete account');
    } else {
      signOut();
    }
  };

  return (
    <section className="p-8 rounded-lg bg-secondary/30 border shadow-md max-w-4xl mx-auto space-y-4">
      <h2 className="font-semibold text-xl">Account Management</h2>
      <p className="p-4 rounded-md bg-destructive/10 text-destructive">
        Notice, If you delete your account, all your data will be permanently lost without the
        possibility of recovery.
      </p>
      <Button
        variant="outline"
        className="text-secondary-foreground/80 hover:bg-destructive/20 hover:text-destructive"
        onClick={handleDelete}
      >
        <Trash2
          size={20}
          strokeWidth={1.7}
        />{' '}
        delete account
      </Button>
    </section>
  );
};
