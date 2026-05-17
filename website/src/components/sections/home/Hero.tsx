'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GradientBlob } from '@/components/svg/GradientBlob';
import { ArrowDown } from '@/components/svg/ArrowDown';
import { easeOutExpo } from '@/lib/motion';

/**
 * Homepage hero. Big lowercase display headline, three short anchor lines,
 * a single oversized primary CTA. Background tries to play the brand reel; if
 * the file is missing it never appears (the <video> stays hidden via onError)
 * and the static GradientBlob accent does the heavy lifting.
 */
export function Hero(): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40"
    >
      <BackgroundVideo />

      {/* Decorative accent — visible always, sits over the (possibly missing) video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 z-0 opacity-70 md:-right-20"
      >
        <GradientBlob size={720} color="#FF6B35" seed={3} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-bg/30 via-bg/40 to-bg"
      />

      <Container className="relative z-10">
        <div className="max-w-[18ch] space-y-3 font-body text-sm uppercase tracking-[0.18em] text-fg/70 md:text-[13px]">
          <p>a client trained their in-house team using our playbook.</p>
          <p>then they stopped paying us.</p>
          <p className="text-accent">we sent them a thank-you note.</p>
        </div>

        <motion.h1
          id="hero-heading"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.15 }}
          className="mt-10 max-w-[14ch] font-display text-[clamp(3.5rem,11vw,10rem)] font-bold leading-[0.92] tracking-[-0.02em] text-balance lowercase"
        >
          your last agency.{' '}
          <span className="italic text-accent">we mean that literally.</span>
        </motion.h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.45 }}
          className="mt-10 grid max-w-3xl gap-2 font-body text-lg text-fg/85 md:text-xl"
        >
          <p>We build the function. Run it for twelve to eighteen months.</p>
          <p>Train your in-house hire. Hand over the playbook.</p>
          <p className="text-fg">Then we leave. The exit is the product.</p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Button href="/get-in-touch" variant="primary" size="lg">
            Hire us. Then unfollow us.
          </Button>
          <span className="font-body text-sm text-muted">
            fixed term. no auto-renew.
          </span>
        </motion.div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}

function BackgroundVideo(): JSX.Element {
  // The hero reel may not exist yet (asset-manager backlog). We render the
  // tag with onError → hide self, so a missing file leaves no broken icon.
  return (
    <video
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onError={(event) => {
        const el = event.currentTarget;
        el.style.display = 'none';
      }}
    >
      <source src="/assets/brand/hero-reel.mp4" type="video/mp4" />
    </video>
  );
}

function ScrollIndicator(): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, 6, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        }
        className="flex flex-col items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-fg/60"
      >
        <span>scroll</span>
        <ArrowDown size={18} className="text-fg/70" />
      </motion.div>
    </div>
  );
}
