'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect, type ReactNode } from 'react';

/**
 * Lenis smooth-scroll provider.
 *
 * - Instantiates Lenis once on mount.
 * - Hooks into requestAnimationFrame loop.
 * - Skips entirely when the user prefers reduced motion (native scroll wins).
 */
export function LenisProvider({ children }: { children: ReactNode }): JSX.Element {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    function raf(time: number): void {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
