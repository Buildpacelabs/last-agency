import Link from 'next/link';
import { RichText, plain } from '@/components/RichText';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';
import { FaqList } from '@/components/FaqList';
import { FinalCta } from '@/components/FinalCta';
import { anchorId, pageHref, TYPE_LABEL, type ContentPage, type Section } from '@/content/types';

/* =========================================================================
   The renderer every programmatic page runs through. One shell, so a change
   to heading structure or schema anchoring lands on all ~500 URLs at once.
   ========================================================================= */

function SectionBlock({ section }: { section: Section }): JSX.Element {
  const id = section.id ?? anchorId(section.h2);
  return (
    <section className="art-sec" id={id} aria-labelledby={`${id}-h`}>
      {/* Headings get plain(), not RichText — a link inside an <h2> is invalid
          nesting for the TOC anchor, and the same string feeds anchorId(). */}
      <h2 id={`${id}-h`}>{plain(section.h2)}</h2>

      {section.body?.map((p, i) => (
        <p key={i}>
          <RichText text={p} />
        </p>
      ))}

      {section.bullets?.length ? (
        <ul className="art-ul">
          {section.bullets.map((b, i) => (
            <li key={i}>
              <RichText text={b} />
            </li>
          ))}
        </ul>
      ) : null}

      {section.numbered?.length ? (
        <ol className="art-ol">
          {section.numbered.map((b, i) => (
            <li key={i}>
              <RichText text={b} />
            </li>
          ))}
        </ol>
      ) : null}

      {section.table ? (
        <div className="art-table-wrap">
          <table className="art-table">
            {section.table.caption ? <caption>{plain(section.table.caption)}</caption> : null}
            <thead>
              <tr>
                {section.table.head.map((h, i) => (
                  <th key={i} scope="col">
                    {plain(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        <RichText text={cell} />
                      </th>
                    ) : (
                      <td key={j}>
                        <RichText text={cell} />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {section.callout ? (
        <aside className={`art-callout ${section.callout.kind}`}>
          {section.callout.title ? <strong>{plain(section.callout.title)}</strong> : null}
          <p>
            <RichText text={section.callout.body} />
          </p>
        </aside>
      ) : null}

      {section.subs?.map((sub, i) => {
        const sid = anchorId(sub.h3);
        return (
          <div className="art-sub" key={i}>
            <h3 id={sid}>{plain(sub.h3)}</h3>
            {sub.body?.map((p, j) => (
              <p key={j}>
                <RichText text={p} />
              </p>
            ))}
            {sub.bullets?.length ? (
              <ul className="art-ul">
                {sub.bullets.map((b, j) => (
                  <li key={j}>
                    <RichText text={b} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}

export function ArticleShell({
  page,
  crumbs,
  related,
  eyebrow,
  answerLabel = 'The short answer',
}: {
  page: ContentPage;
  crumbs: Crumb[];
  related: ContentPage[];
  eyebrow?: string;
  answerLabel?: string;
}): JSX.Element {
  const toc = page.sections.map((s) => ({ id: s.id ?? anchorId(s.h2), label: plain(s.h2) }));
  const updated = new Date(`${page.updated}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <>
      <header className="band-ink art-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          {eyebrow ? <p className="eyebrow eyebrow-red">{eyebrow}</p> : null}
          <h1 className="art-h1">{plain(page.h1)}</h1>

          <div className="art-answer">
            <span className="art-answer-label">{answerLabel}</span>
            <p>
              <RichText text={page.answer} />
            </p>
          </div>

          <p className="art-meta">
            Updated {updated} · Written by the Last Agency team ·{' '}
            <Link href="/pricing">See what SEO actually costs</Link>
          </p>
        </div>
      </header>

      {page.takeaways?.length ? (
        <section className="band-cream pad-sm" aria-labelledby="tldr-h">
          <div className="wrap">
            <h2 className="art-tldr-h" id="tldr-h">
              The short version
            </h2>
            <ul className="art-tldr">
              {page.takeaways.map((t, i) => (
                <li key={i}>
                  <RichText text={t} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <div className="band-ink pad-sm">
        <div className="wrap art-grid">
          {toc.length > 2 ? (
            <aside className="art-toc" aria-label="On this page">
              <p className="art-toc-h">On this page</p>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ol>
            </aside>
          ) : null}

          <article className="art-body">
            {page.sections.map((s, i) => (
              <SectionBlock key={i} section={s} />
            ))}
          </article>
        </div>
      </div>

      {page.faqs?.length ? (
        <section className="band-ink pad" aria-labelledby="art-faq-h">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <h2 className="sec-h" id="art-faq-h">
              Related questions.
            </h2>
          </div>
          <FaqList items={page.faqs} openFirst={false} />
        </section>
      ) : null}

      {related.length ? (
        <section className="band-cream pad" aria-labelledby="art-rel-h">
          <div className="wrap">
            <p className="eyebrow eyebrow-red">Keep reading</p>
            <h2 className="sec-h" id="art-rel-h">
              Next, the thing you&rsquo;ll ask after this.
            </h2>
            <ul className="art-related">
              {related.map((r) => (
                <li key={`${r.type}/${r.slug}`}>
                  <span className="rl-kind">{TYPE_LABEL[r.type]}</span>
                  <Link href={pageHref(r.type, r.slug)} className="rl-title">
                    {plain(r.h1)}
                  </Link>
                  <span className="rl-desc">{r.metaDescription}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
