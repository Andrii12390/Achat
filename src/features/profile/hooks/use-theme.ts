'use client';

import { useLayoutEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

import { type Theme } from '@/types';

const THEME_KEY = 'selected-theme';

export const useTheme = () => {
  const { setTheme } = useNextTheme();
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

  return {
    selectedTheme,
    handleSwitchTheme,
  };
};
