import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { File, Trash2 } from 'lucide-react';
import { AvatarDropzone } from '@/features/profile/components';

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  hasAvatar: boolean;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

export const AvatarDialog = ({ open, onOpenChange, hasAvatar, onUpload, onDelete }: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-secondary-foreground">
            Manage your avatar
          </DialogTitle>
        </DialogHeader>
        {!hasAvatar ? (
          <AvatarDropzone handleSelectFile={onUpload} />
        ) : (
          <div className="bg-primary/15 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                  <File size={20} />
                </div>
                <p className="font-medium text-sm">Avatar already uploaded</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onDelete}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <AvatarDropzone handleSelectFile={onUpload} />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
