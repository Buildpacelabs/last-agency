import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientBlob } from '@/components/svg/GradientBlob';
import { getAssetManifest } from '@/lib/content';

type Slot = {
  relPath: string | undefined;
  caption: string;
  seed: number;
};

export function PhotoSplit(): JSX.Element {
  const manifest = getAssetManifest();
  const photos = manifest.pages.about;

  const slots: Slot[] = [
    {
      relPath: photos?.[0],
      caption: 'team review. friday afternoon. nobody is on slack.',
      seed: 11,
    },
    {
      relPath: photos?.[1],
      caption: 'the playbook draft. version six. printed and marked up.',
      seed: 17,
    },
  ];

  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {slots.map((slot, i) => (
            <ScrollReveal key={slot.seed} delay={i * 0.08}>
              <figure className="flex flex-col gap-4">
                <PhotoFrame slot={slot} />
                <figcaption className="font-body text-sm text-muted">
                  {slot.caption}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PhotoFrame({ slot }: { slot: Slot }): JSX.Element {
  const resolved = resolvePublicImage(slot.relPath);

  if (resolved) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border">
        <Image
          src={resolved}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-fg/[0.03]">
      <GradientBlob
        seed={slot.seed}
        size={520}
        className="absolute inset-0 m-auto opacity-70"
      />
    </div>
  );
}

function resolvePublicImage(rel: string | undefined): string | null {
  if (!rel) return null;
  const stripped = rel.replace(/^\.?\//, '');
  const publicPath = `/${stripped}`;
  const absolute = path.join(process.cwd(), 'public', stripped);
  try {
    if (fs.existsSync(absolute)) return publicPath;
  } catch {
    /* swallow */
  }
  return null;
}
