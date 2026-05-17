'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp } from '@/lib/motion';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Distance from viewport edge before triggering. Default '-80px'. */
  margin?: `${number}px` | `-${number}px`;
  /** Reveal once and stay visible. Default true. */
  once?: boolean;
  /** Optional delay in seconds. */
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'span';
};

/**
 * Wraps children in a motion element that fades + translates up when it
 * enters the viewport. Under prefers-reduced-motion the wrapper renders
 * the children fully visible from the start.
 */
export function ScrollReveal({
  children,
  className,
  margin = '-80px',
  once = true,
  delay,
  as = 'div',
}: ScrollRevealProps): JSX.Element {
  const reduce = useReducedMotion();

  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={fadeUp}
      transition={delay !== undefined ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
