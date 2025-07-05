'use client';

import { type Theme } from '@/types';
import { useTheme } from '@/features/profile/hooks';
import { themes } from '@/features/profile/data/themes';
import { ThemeCard } from '@/features/profile/components';

export const AccountPreferences = () => {
  const { selectedTheme, handleSwitchTheme } = useTheme();

  if (!selectedTheme) return null;

  return (
    <section className="p-8 rounded-lg bg-secondary/30 shadow-md border max-w-4xl mx-auto space-y-4">
      <h2 className="font-semibold text-xl">Preferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map(theme => (
          <ThemeCard
            key={theme.key}
            theme={theme}
            isActive={selectedTheme === theme.key}
            onClick={() => handleSwitchTheme(theme.key as Theme)}
          />
        ))}
      </div>
    </section>
  );
};
