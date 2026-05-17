import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { GradientBlob } from '@/components/svg/GradientBlob';
import { getAssetManifest } from '@/lib/content';

/**
 * /services hero. Oversized headline + dark overlay over a hero image.
 * If the manifest's image is missing on disk we fall back to a pure dark
 * panel with a single GradientBlob accent — never a stock placeholder.
 */
export function ServicesHero(): JSX.Element {
  const manifest = getAssetManifest();
  const rel = manifest.pages.services;
  const heroImage = resolvePublicImage(rel);

  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {heroImage ? (
        <>
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-30"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-bg/70" />
        </>
      ) : (
        <GradientBlob
          seed={3}
          size={720}
          className="pointer-events-none absolute -right-32 top-1/4 -z-10 opacity-60"
        />
      )}

      <Container className="flex min-h-[78vh] flex-col justify-end py-32 md:py-40">
        <SectionLabel className="mb-8">• services</SectionLabel>
        <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.92] tracking-tight text-balance lowercase">
          four things.{' '}
          <span className="italic text-accent">in order.</span> then we go.
        </h1>
        <div className="mt-10 max-w-2xl space-y-3 font-body text-lg text-muted md:text-xl">
          <p>
            Build the function. Run it for a year. Train your hire. Hand over
            the playbook. The exit is the product.
          </p>
          <p>Fixed term. Fixed scope. No auto-renew.</p>
        </div>
      </Container>
    </section>
  );
}

/**
 * Returns a `/...` public-relative path if the manifest's asset exists on disk
 * under website/public, otherwise null. Asset-manager wires the real files in
 * a later phase — until then every page renders the GradientBlob fallback.
 */
function resolvePublicImage(rel: string | undefined): string | null {
  if (!rel) return null;
  const stripped = rel.replace(/^\.?\//, '');
  // Manifest paths look like "./assets/brand/services-hero.jpg" — we map them
  // onto /assets/... under public/.
  const publicPath = `/${stripped}`;
  const absolute = path.join(process.cwd(), 'public', stripped);
  try {
    if (fs.existsSync(absolute)) return publicPath;
  } catch {
    /* swallow */
  }
  return null;
}
