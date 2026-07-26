import Link from 'next/link';
import { getPage, getPages } from '@/content/loader';
import { pageHref, TYPE_LABEL, TYPE_PATH, type ContentPage, type PageType } from '@/content/types';

/* =========================================================================
   Links from the money pages down into the library.

   Nav and footer already reach the eight hubs. What they don't do is pass
   topical context — a link from /seo to a specific SEO cost page tells Google
   those two URLs are about the same thing, and it puts the deep page two clicks
   from the homepage instead of three. At ~500 URLs, crawl depth is the
   difference between indexed and ignored.

   Renders nothing when the referenced content doesn't exist yet, so it's safe
   to place before the content lands.
   ========================================================================= */

export function ContentTeaser({
  eyebrow,
  title,
  prefer = [],
  fill,
  limit = 6,
  band = 'band-ink',
}: {
  eyebrow: string;
  title: string;
  /** Preferred pages, in order. Silently skipped if not yet written. */
  prefer?: { type: PageType; slug: string }[];
  /** Top up from these families if `prefer` doesn't fill the quota. */
  fill?: PageType[];
  limit?: number;
  band?: 'band-ink' | 'band-cream';
}): JSX.Element | null {
  const seen = new Set<string>();
  const picked: ContentPage[] = [];

  for (const ref of prefer) {
    const p = getPage(ref.type, ref.slug);
    if (!p) continue;
    const key = `${p.type}/${p.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(p);
    if (picked.length >= limit) break;
  }

  for (const t of fill ?? []) {
    if (picked.length >= limit) break;
    for (const p of getPages(t)) {
      const key = `${p.type}/${p.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      picked.push(p);
      if (picked.length >= limit) break;
    }
  }

  if (!picked.length) return null;

  const hubs = [...new Set(picked.map((p) => p.type))];

  return (
    <section className={`${band} pad`} aria-labelledby="teaser-h">
      <div className="wrap">
        <p className={`eyebrow ${band === 'band-cream' ? 'eyebrow-red' : 'eyebrow-red'}`}>
          {eyebrow}
        </p>
        <h2 className="sec-h" id="teaser-h">
          {title}
        </h2>
        <ul className="hub-list" style={{ marginTop: 24 }}>
          {picked.map((p) => (
            <li key={`${p.type}/${p.slug}`}>
              <Link href={pageHref(p.type, p.slug)}>
                <span className="hl-title">{p.h1}</span>
                <span className="hl-desc">{p.metaDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="art-meta" style={{ marginTop: 20 }}>
          {hubs.map((t, i) => (
            <span key={t}>
              {i > 0 ? ' · ' : ''}
              <Link href={TYPE_PATH[t]}>All {TYPE_LABEL[t].toLowerCase()}</Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
