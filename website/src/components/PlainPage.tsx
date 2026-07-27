import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { RichText } from '@/components/RichText';
import { FinalCta } from '@/components/FinalCta';
import { anchorId } from '@/content/types';

/* =========================================================================
   Shell for the site's own pages — about, contact, privacy, terms.

   Deliberately the same reading surface as an article: these are the pages a
   prospect, a journalist or a quality rater opens to decide whether the
   business is real, and they should be as easy to read as the library is.
   ========================================================================= */

export type PlainSection = {
  h2: string;
  body?: string[];
  bullets?: string[];
};

export function PlainPage({
  eyebrow,
  h1,
  lede,
  crumbs,
  sections,
  showCta = true,
}: {
  eyebrow?: string;
  h1: string;
  lede: string;
  crumbs: Crumb[];
  sections: PlainSection[];
  showCta?: boolean;
}): JSX.Element {
  return (
    <>
      <header className="band-ink art-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          {eyebrow ? <p className="eyebrow eyebrow-red">{eyebrow}</p> : null}
          <h1 className="art-h1">{h1}</h1>
          <div className="art-answer">
            <p>
              <RichText text={lede} />
            </p>
          </div>
        </div>
      </header>

      <div className="band-ink pad-sm">
        <div className="wrap art-grid">
          <article className="art-body" style={{ gridColumn: '1 / -1' }}>
            {sections.map((s) => {
              const id = anchorId(s.h2);
              return (
                <section className="art-sec" id={id} key={id} aria-labelledby={`${id}-h`}>
                  <h2 id={`${id}-h`}>{s.h2}</h2>
                  {s.body?.map((p, i) => (
                    <p key={i}>
                      <RichText text={p} />
                    </p>
                  ))}
                  {s.bullets?.length ? (
                    <ul className="art-ul">
                      {s.bullets.map((b, i) => (
                        <li key={i}>
                          <RichText text={b} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              );
            })}
          </article>
        </div>
      </div>

      {showCta ? <FinalCta /> : null}
    </>
  );
}
