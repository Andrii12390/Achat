'use client';

import { type Theme } from '@/types';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const THEME_KEY = 'selected-theme';

const themes = [
  {
    key: 'light',
    label: 'Light theme',
    icon: (
      <Sun
        size={20}
        strokeWidth={1.7}
        className="text-gray-700"
      />
    ),
    cardClass: 'bg-gray-100 border-gray-200',
    figureClass: 'bg-gray-300',
    labelClass: 'text-gray-700',
  },
  {
    key: 'dark',
    label: 'Dark theme',
    icon: (
      <Moon
        size={20}
        strokeWidth={1.7}
        className="text-gray-300"
      />
    ),
    cardClass: 'bg-gray-800 border-gray-600',
    figureClass: 'bg-gray-700',
    labelClass: 'text-gray-100',
  },
  {
    key: 'system',
    label: 'System theme',
    icon: (
      <Monitor
        size={20}
        strokeWidth={1.7}
        className="text-gray-300"
      />
    ),
    cardClass: 'bg-gray-500 border-gray-600',
    figureClass: 'bg-gray-400',
    labelClass: 'text-gray-100',
  },
];

export const ProfilePreferences = () => {
  const { setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  useLayoutEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setSelectedTheme(stored);
    } else {
      setSelectedTheme('system');
    }
  }, []);

  const handleSwitchTheme = (theme: Theme) => {
    setTheme(theme);
    setSelectedTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  };

  if (selectedTheme === null) return null;

  return (
    <section className="p-8 rounded-lg bg-secondary/30 shadow-md border max-w-4xl mx-auto space-y-4">
      <h2 className="font-semibold text-xl">Preferences</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map(theme => (
          <button
            key={theme.key}
            className={cn(
              'p-4 rounded-xl shadow-md border space-y-4 transition-all hover:cursor-pointer hover:shadow-primary/50 hover:border-primary',
              theme.cardClass,
              selectedTheme === theme.key && 'ring-1 ring-primary border-primary shadow-primary/50',
            )}
            onClick={() => handleSwitchTheme(theme.key as Theme)}
          >
            <div className="flex items-center gap-4">
              <div className="flex gap-3">
                <div className={cn('size-14 rounded-full', theme.figureClass)} />
              </div>
              <div className="flex-1 space-y-2">
                <div className={cn('h-3.5 w-full rounded', theme.figureClass)} />
                <div className={cn('h-3.5 w-3/4 rounded', theme.figureClass)} />
              </div>
            </div>
            <div className="flex pl-1 gap-2 items-center">
              {theme.icon}
              <span className={cn('font-semibold text-sm', theme.labelClass)}>{theme.label}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
