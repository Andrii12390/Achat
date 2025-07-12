'use client';

import { Camera, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { UserAvatar } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DEFAULT_GROUP_IMAGE } from '@/constants';
import { cn } from '@/lib/utils';

import { groupService } from '../services';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  group: {
    id: string;
    name: string;
    imageUrl: string | null;
    avatarColor: string;
  };
}

export const EditGroupModal = ({ isOpen, onClose, group }: Props) => {
  const [groupName, setGroupName] = useState(group.name);
  const [groupImageFile, setGroupImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(group.imageUrl);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGroupImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setGroupImageFile(null);
    setImagePreview(null);
  };

  const handleSaveChanges = () => {
    if (!groupName.trim()) {
      return;
    }

    const formData = new FormData();
    formData.append('title', groupName.trim());

    // Case 1: Якщо було обрано новий файл.
    if (groupImageFile) {
      formData.append('file', groupImageFile);
    }
    // Case 2: Якщо існуюче зображення було видалено (але не було обрано нового).
    else if (!imagePreview && group.imageUrl) {
      formData.append('file', 'null'); // Надсилаємо сигнал на видалення.
    }
    // Case 3: Якщо зображення не змінювалось, поле 'file' не додається.

    groupService.update(group.id, formData);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="bg-card sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Group Info</DialogTitle>
          <DialogDescription>Update your group&apos;s name and photo.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-8 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="group relative shrink-0 cursor-pointer">
              <label htmlFor="group-photo-upload">
                <UserAvatar
                  username={groupName}
                  size="xl"
                  imageUrl={imagePreview || DEFAULT_GROUP_IMAGE}
                  avatarColor={group.avatarColor}
                />
                <div
                  className={cn(
                    'focus:ring-primary/50 absolute inset-0 flex size-24 cursor-pointer items-center justify-center rounded-full bg-black/40 transition-all duration-200 focus:ring-2 focus:outline-none',
                    isHovering ? 'opacity-100' : 'opacity-0 hover:opacity-100',
                  )}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Camera
                    className="text-white"
                    size={24}
                  />
                </div>
              </label>
              <input
                id="group-photo-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && imagePreview !== DEFAULT_GROUP_IMAGE && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive flex items-center gap-2"
                onClick={handleDeleteImage}
              >
                <Trash2 size={16} />
                Remove Photo
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="group-title">Group title</Label>
            <Input
              id="group-title"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
