'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { easeOutExpo, fadeUp, stagger } from '@/lib/motion';

type Pillar = {
  index: string;
  title: string;
  months: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    index: '01',
    title: 'The Build',
    months: 'months 0–3',
    body: 'Three months. Fixed scope. We set up paid, lifecycle, brand — whichever lever was bleeding. New account structure, a real LTV model, a creative brief template anyone can read. The in-house seat gets hired in week six so the function and the person arrive at the same time.',
  },
  {
    index: '02',
    title: 'The Run',
    months: 'months 3–12',
    body: 'Nine months operating what we built. Weekly numbers, monthly board doc, no decks. Every decision gets written down the day it happens — by month eight the playbook is half-finished without anyone calling it a playbook.',
  },
  {
    index: '03',
    title: 'The Handoff',
    months: 'months 12–15',
    body: 'Three months training the in-house hire. They run the Friday review. We sit at the back and say nothing. The transfer is account access, dashboards, vendor relationships, the written playbook — usually 40 pages and a Loom per chapter.',
  },
  {
    index: '04',
    title: 'The Exit',
    months: 'month 15+',
    body: 'One month to close out. You own the data, the accounts, the playbook. We stay reachable for thirty days. After that, the Slack channel goes quiet — most of them never message back. That is the result.',
  },
];

export function Services(): JSX.Element {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-28 md:py-40"
    >
      <Container>
        <div className="max-w-4xl space-y-6">
          <SectionLabel>what we do</SectionLabel>
          <motion.h2
            id="services-heading"
            initial={reduce ? false : 'hidden'}
            whileInView={reduce ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.02em] text-balance lowercase"
          >
            four things. in order.{' '}
            <span className="italic text-accent">then we go.</span>
          </motion.h2>
          <motion.p
            initial={reduce ? false : 'hidden'}
            whileInView={reduce ? undefined : 'visible'}
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="max-w-2xl font-body text-lg text-muted"
          >
            A fixed-term engagement: twelve to eighteen months, one scope, no auto-renew. Each phase
            has its own job. The last one is to make ours redundant.
          </motion.p>
        </div>

        <motion.ul
          role="list"
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-24 md:grid-cols-2"
        >
          {PILLARS.map((pillar) => (
            <motion.li
              key={pillar.index}
              variants={fadeUp}
              className="group relative bg-bg p-8 transition-colors duration-300 hover:bg-fg/[0.02] md:p-12"
            >
              <div className="flex items-baseline gap-4 font-body text-sm text-muted">
                <span className="text-accent">{pillar.index}</span>
                <span>{pillar.months}</span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-5xl">
                {pillar.title}
              </h3>
              <p className="mt-6 max-w-md font-body text-base text-fg/85 md:text-lg">{pillar.body}</p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-8 right-8 h-px w-12 origin-right scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 md:bottom-12 md:right-12"
                style={{ transitionTimingFunction: `cubic-bezier(${easeOutExpo.join(',')})` }}
              />
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-14 flex flex-wrap items-center gap-4 md:mt-20">
          <Button href="/services" variant="secondary" size="lg" showArrow>
            See the four steps
          </Button>
          <span className="font-body text-sm text-muted">
            fixed term. fixed scope. no auto-renew.
          </span>
        </div>
      </Container>
    </section>
  );
}
