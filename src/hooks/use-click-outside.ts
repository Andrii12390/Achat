import { useEffect, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, cb: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    }

    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, [cb, ref]);
}
