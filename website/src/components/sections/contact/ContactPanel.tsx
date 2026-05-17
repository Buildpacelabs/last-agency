import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { GradientBlob } from '@/components/svg/GradientBlob';
import { ContactForm } from './ContactForm';
import { getAssetManifest } from '@/lib/content';

/**
 * Two-column contact panel: form on one side, side visual on the other.
 * Visual prefers the manifest's contact-bg.jpg; falls back to a GradientBlob
 * composition when the asset isn't on disk yet.
 */
export function ContactPanel(): JSX.Element {
  const manifest = getAssetManifest();
  const bg = resolvePublicImage(manifest.pages.contact);

  return (
    <section className="border-b border-border">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
          <div>
            <ContactForm />
          </div>

          <aside aria-hidden="true" className="relative hidden md:block">
            <div className="sticky top-32 aspect-[3/4] overflow-hidden rounded-sm border border-border bg-fg/[0.03]">
              {bg ? (
                <Image
                  src={bg}
                  alt=""
                  fill
                  sizes="40vw"
                  className="object-cover opacity-80"
                />
              ) : (
                <>
                  <GradientBlob
                    seed={23}
                    size={560}
                    className="absolute inset-0 m-auto opacity-80"
                  />
                  <GradientBlob
                    seed={31}
                    size={300}
                    className="absolute -bottom-10 -right-10 opacity-50"
                  />
                </>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </section>
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
