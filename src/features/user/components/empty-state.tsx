import { Search } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <Search
        size={40}
        className="mx-auto mb-4"
      />
      <p className="text-lg font-medium mb-2">Users not found</p>
      <p className="text-sm">Try to invite your friends!</p>
    </div>
  );
};
