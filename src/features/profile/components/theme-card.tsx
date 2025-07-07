import { cn } from '@/lib/utils';

import { themes } from '@/features/profile/data/themes';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  isActive: boolean;
  theme: (typeof themes)[number];
  onClick: () => void;
}

export const ThemeCard = ({ isActive, theme, onClick }: Props) => {
  const { key, label, icon: Icon, iconClass, cardClass, figureClass, labelClass } = theme;

  return (
    <button
      key={key}
      className={cn(
        'p-4 rounded-xl shadow-md border space-y-3 transition-all hover:cursor-pointer hover:shadow-primary/50 hover:border-primary',
        cardClass,
        isActive && 'ring-1 ring-primary border-primary',
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-3">
          <Skeleton className={cn('size-14 rounded-full', figureClass)} />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className={cn('h-3.5 w-full rounded', figureClass)} />
          <Skeleton className={cn('h-3.5 w-3/4 rounded', figureClass)} />
        </div>
      </div>
      <div className="flex pl-1 gap-2 items-center">
        <Icon
          className={iconClass}
          size={20}
          strokeWidth={1.7}
        />
        <span className={cn('font-semibold text-sm', labelClass)}>{label}</span>
      </div>
    </button>
  );
};
