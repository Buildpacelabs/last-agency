import type { Metadata } from 'next';
import { ServicesHero } from '@/components/sections/services/ServicesHero';
import { PhilosophyLine } from '@/components/sections/services/PhilosophyLine';
import { PillarSection } from '@/components/sections/services/PillarSection';
import { PricingPosture } from '@/components/sections/services/PricingPosture';
import { ServicesClosingCta } from '@/components/sections/services/ServicesClosingCta';
import { getSeoForRoute } from '@/lib/content';

const ROUTE = '/services';

export function generateMetadata(): Metadata {
  const seo = getSeoForRoute(ROUTE);
  if (!seo) return {};
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: seo.ogImage
      ? {
          title: seo.title,
          description: seo.description,
          images: [{ url: seo.ogImage }],
        }
      : undefined,
  };
}

export default function ServicesPage(): JSX.Element {
  const seo = getSeoForRoute(ROUTE);
  // seo.json's /services schema is an array (Service x4 + BreadcrumbList).
  const schema = seo?.schema as unknown;

  return (
    <>
      {schema ? (
        <script
          type="application/ld+json"
          // The JSON in seo.json is hand-authored and trusted.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}

      <ServicesHero />

      <PhilosophyLine />

      <PillarSection
        id="build"
        number="01"
        months="months 0–3"
        heading="the build."
        subhead="We set up the function — paid, lifecycle, brand, CRM, attribution — whichever was bleeding."
        body="Three months. Fixed scope. We pick one or two functions that are losing you money, rebuild them from the brief up, and ship a working baseline. By month three you can read a number, trust it, and act on it."
        deliverables={[
          'paid account setup — Meta, Google, the channels that matter for your business',
          'creative pipeline — brief template, shot list, edit cadence, weekly batch',
          'attribution wiring — server-side events, post-purchase survey, model picked and signed off',
          'CRM + lifecycle stack — Klaviyo / HubSpot / whatever you already pay for, wired right',
          'baseline benchmarks — CAC, ROAS, repeat rate, payback, all on a single dashboard',
          'a documented hypothesis sheet — what we think will move, in what order, with numbers',
        ]}
      />

      <PillarSection
        id="run"
        number="02"
        months="months 3–12"
        heading="the run."
        subhead="We operate the function we built. Hit the numbers. Document every decision so the playbook writes itself."
        body="Nine months of full-funnel ownership. We run the experiments, scale what works, kill what doesn't, and write down why — so by the time we hand off, the answers are on the page, not in someone's head."
        deliverables={[
          'full-funnel ownership — top, middle, bottom; paid, organic, email',
          'weekly experiments — minimum two creative tests, one landing test, one audience test',
          'no creative caps — we ship as many concepts as the model can absorb',
          'ROAS / CAC targets reviewed monthly, re-baselined quarterly',
          'monthly board-ready report — three pages, no slideware, numbers up front',
          'a running decision log — every meaningful call, why we made it, what it cost',
        ]}
      />

      <PillarSection
        id="handoff"
        number="03"
        months="months 12–15"
        heading="the handoff."
        subhead="The brand's hero pillar. We make ourselves replaceable on purpose."
        body="The handoff is what the rest of the agency model exists for. Three months to package what we learned, recruit the person who'll own it, and prove they can run it without us. If we can't get this right, none of the previous twelve months count."
        emphasis="hero"
        subBlocks={[
          {
            title: 'the playbook',
            body: 'A documented SOPs package — channel ops, creative cadence, attribution model, vendor list, weekly rituals. Notion-shaped, version-controlled, written for the person who replaces us.',
          },
          {
            title: 'the hire',
            body: 'We recruit and train your in-house growth lead. Sourced, screened, offered, on-boarded. Sitting next to us by the start of month thirteen.',
          },
          {
            title: 'the shadow',
            body: 'A 60-day reverse-shadow. They run the function in real time. We watch, correct on the side, and stay quiet on the call. If they can hold the numbers for sixty days, the handoff is done.',
          },
        ]}
      />

      <PillarSection
        id="exit"
        number="04"
        months="months 15–18"
        heading="the exit."
        subhead="Matter-of-fact. Almost solemn. The exit is the product."
        body="One month to close. You own the accounts, the dashboards, the vendor relationships, the playbook, the hire. We stay reachable for sixty days for the questions only we can answer. After that, we're gone — by design, on the date the contract said we would be."
        subBlocks={[
          {
            title: 'the bow-out',
            body: 'A clean account handover — billing, access, vendor agreements, ad-platform admin, all transferred and signed. One final shared doc, then we close the channel.',
          },
          {
            title: 'standby',
            body: 'Retainer-free. Quarterly check-ins for six months on request. No invoice unless you ask us back for a defined, scoped project. Usually you don’t.',
          },
        ]}
      />

      <PricingPosture />

      <ServicesClosingCta />
    </>
  );
}
