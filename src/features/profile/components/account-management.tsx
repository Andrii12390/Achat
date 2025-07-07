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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="font-semibold text-xl mb-6">Account Management</h2>
        <p className="p-4 rounded-md bg-destructive/10 text-destructive mb-4">
          Notice, If you delete your account, all your data will be permanently lost.
        </p>
        <Button
          variant="outline"
          className="text-secondary-foreground/80 hover:bg-destructive/20 hover:text-destructive cursor-pointerme"
          onClick={handleDelete}
        >
          <Trash2
            size={20}
            strokeWidth={1.7}
          />{' '}
          delete account
        </Button>
      </section>
    </div>
  );
};
