import { Search } from 'lucide-react';

import { ICON_SIZES, ICON_STROKE_WIDTH } from '@/constants';

export const EmptyState = () => {
  return (
    <div className="text-muted-foreground py-12 text-center">
      <Search
        size={ICON_SIZES['2XL']}
        strokeWidth={ICON_STROKE_WIDTH}
        className="mx-auto mb-4"
      />
      <p className="mb-2 text-lg font-medium">Chats not found</p>
      <p className="text-sm">Go to users page and start a new conversation!</p>
    </div>
  );
};
