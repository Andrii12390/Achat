import { Monitor, Moon, Sun } from 'lucide-react';

export const themes = [
  {
    key: 'light',
    label: 'Light theme',
    icon: Sun,
    iconClass: 'text-gray-700',
    cardClass: 'bg-white border-gray-200',
    figureClass: 'bg-gray-200',
    labelClass: 'text-gray-700',
  },
  {
    key: 'dark',
    label: 'Dark theme',
    icon: Moon,
    iconClass: 'text-gray-300',
    cardClass: 'bg-slate-800 border-slate-700',
    figureClass: 'bg-slate-600',
    labelClass: 'text-slate-300',
  },
  {
    key: 'system',
    label: 'System theme',
    icon: Monitor,
    iconClass: 'text-gray-700',
    cardClass: 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300',
    figureClass: 'bg-slate-200',
    labelClass: 'text-gray-700',
  },
];
