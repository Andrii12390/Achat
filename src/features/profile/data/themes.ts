import { Monitor, Moon, Sun } from 'lucide-react';

export const themes = [
  {
    key: 'light',
    label: 'Light theme',

    icon: Sun,
    iconClass: 'text-gray-700',
    cardClass: 'bg-gray-100 border-gray-200',
    figureClass: 'bg-gray-300',
    labelClass: 'text-gray-700',
  },
  {
    key: 'dark',
    label: 'Dark theme',
    icon: Moon,
    iconClass: 'text-gray-300',
    cardClass: 'bg-gray-800 border-gray-600',
    figureClass: 'bg-gray-700',
    labelClass: 'text-gray-100',
  },
  {
    key: 'system',
    label: 'System theme',
    icon: Monitor,
    iconClass: 'text-gray-300',
    cardClass: 'bg-gray-500 border-gray-600',
    figureClass: 'bg-gray-400',
    labelClass: 'text-gray-100',
  },
];
