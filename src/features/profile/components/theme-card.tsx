import { Skeleton } from '@/components/ui/skeleton';
import { themes } from '@/features/profile/data/themes';
import { cn } from '@/lib/utils';

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
        'hover:shadow-primary/50 hover:border-primary space-y-3 rounded-xl border p-4 shadow-md transition-all hover:cursor-pointer',
        cardClass,
        isActive && 'ring-primary border-primary ring-1',
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
      <div className="flex items-center gap-2 pl-1">
        <Icon
          className={iconClass}
          size={20}
          strokeWidth={1.7}
        />
        <span className={cn('text-sm font-semibold', labelClass)}>{label}</span>
      </div>
    </button>
  );
};
