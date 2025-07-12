'use client';

import { ThemeCard } from '@/features/profile/components';
import { themes } from '@/features/profile/data/themes';
import { useTheme } from '@/features/profile/hooks';
import { type Theme } from '@/types';

export const AccountPreferences = () => {
  const { selectedTheme, handleSwitchTheme } = useTheme();

  if (!selectedTheme) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <section className="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8">
        <h2 className="text-foreground mb-6 text-xl font-semibold">Preferences</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
    </div>
  );
};
