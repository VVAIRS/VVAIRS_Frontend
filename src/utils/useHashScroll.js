import { useEffect } from 'react';

export function useHashScroll() {
  try {
    useEffect(() => {
      const hash = String(window.location.hash || '').replace('#', '');
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;

      setTimeout(() => {
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
          console.error('Hash scroll error:', error);
        }
      }, 80);
    }, []);
  } catch (error) {
    console.error('useHashScroll hook error:', error);
  }
}