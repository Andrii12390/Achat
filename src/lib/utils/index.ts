import { clsx, type ClassValue } from 'clsx';
import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMessageDate(date: Date) {
  const loc = enUS;

  if (isToday(date)) return format(date, 'HH:mm', { locale: loc });
  if (isYesterday(date)) return 'Yesterday';

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'EEE', { locale: loc });
  }

  if (isThisYear(date)) return format(date, 'd MMM', { locale: loc });

  return format(date, 'dd.MM.yyyy', { locale: loc });
}
