import { useEffect } from 'react';
import Lenis from 'lenis';

// Trial: adds Apple-style eased/momentum scrolling on top of normal mouse-wheel scrolling.
// Kept as one small, self-contained file on purpose — if this doesn't feel right, deleting
// this file and its one import in App.tsx fully removes it with nothing else to unwind.
// Lenis still drives the browser's real scroll position (not a virtual/transformed one), so
// window.scrollY, getBoundingClientRect(), and the site's existing scroll-position-based
// features (nav bar section tracking, the hero name reveal, scrollIntoView navigation)
// should keep working unchanged.
export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};
