'use client';

import { Trash2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';
import { userService } from '@/features/user/services';

export const AccountManagement = () => {
  const handleDelete = async () => {
    const res = await userService.delete();

    if (!res.success) {
      toast.error(res.message);
    } else {
      signOut();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <section className="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8">
        <h2 className="mb-6 text-xl font-semibold">Account Management</h2>
        <p className="bg-destructive/10 text-destructive mb-4 rounded-md p-4">
          Notice, If you delete your account, all your data will be permanently lost.
        </p>
        <Button
          variant="outline"
          className="text-secondary-foreground/80 hover:bg-destructive/20 hover:text-destructive cursor-pointerme"
          onClick={handleDelete}
        >
          <Trash2
            size={ICON_SIZES.MD}
            strokeWidth={ICON_STROKE_WIDTH}
          />{' '}
          delete account
        </Button>
      </section>
    </div>
  );
};
