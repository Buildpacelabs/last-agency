'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TargetIcon } from '@/components/svg/TargetIcon';

/**
 * The anchor block. Sticky for ~1.5 viewport heights; the two lines fade in
 * and the sub-copy drifts up as the user scrolls. Last Agency's analog of
 * TIW's "Targeting is overrated. / Great ads aren't."
 */
export function PhilosophyAnchor(): JSX.Element {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Pinned headline fades up early, peaks mid-section, then drifts up before exit.
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 0.95], [0, 1, 1, 0.4]);
  const headlineY = useTransform(scrollYProgress, [0, 0.4, 1], [40, 0, -60]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="philosophy-heading"
      className="relative bg-bg py-32 md:py-48"
    >
      <div className="sticky top-24 md:top-32">
        <Container className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <motion.div
            style={
              reduce
                ? undefined
                : {
                    opacity: headlineOpacity,
                    y: headlineY,
                  }
            }
            className="max-w-5xl"
          >
            <h2
              id="philosophy-heading"
              className="font-display text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.92] tracking-[-0.03em] text-balance lowercase"
            >
              retainers are{' '}
              <span className="block italic text-accent">a tax on indecision.</span>
            </h2>

            <p className="mt-10 max-w-2xl font-body text-lg text-fg/85 md:text-xl">
              Most agencies bill forever. We bill for fourteen months. The math works because we
              build the function, train your hire, hand over the playbook, and leave. The exit is
              the product.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/services" variant="primary" size="lg">
                See the four pillars
              </Button>
              <span className="font-body text-sm text-muted">
                fixed term. fixed scope. no auto-renew.
              </span>
            </div>
          </motion.div>

          <div
            aria-hidden="true"
            className="hidden text-fg/30 md:block"
          >
            <TargetIcon size={180} accentColor="#FF6B35" />
          </div>
        </Container>
      </div>
    </section>
  );
}
