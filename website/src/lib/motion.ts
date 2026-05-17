import type { Variants } from 'framer-motion';

/** Expressive deceleration. Matches Tailwind's `ease-out-quint`. */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;
/** Scroll-bound easing. */
export const easeInOutQuart = [0.7, 0, 0.2, 1] as const;

/** Single-element fade + 24px translate up. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Container variant that staggers child reveals. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Hoverable arrow nudge — used by CTAs. */
export const arrowNudge: Variants = {
  rest: { x: 0 },
  hover: {
    x: 4,
    transition: { duration: 0.25, ease: easeOutExpo },
  },
};
