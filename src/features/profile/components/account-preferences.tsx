'use client';

import { type Theme } from '@/types';
import { useTheme } from '@/features/profile/hooks';
import { themes } from '@/features/profile/data/themes';
import { ThemeCard } from '@/features/profile/components';

export const AccountPreferences = () => {
  const { selectedTheme, handleSwitchTheme } = useTheme();

  if (!selectedTheme) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <section className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h2 className="text-xl font-semibold text-foreground mb-6">Preferences</h2>
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
    </div>
  );
};
