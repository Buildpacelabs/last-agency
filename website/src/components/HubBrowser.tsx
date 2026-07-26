'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

/* =========================================================================
   Hub index browser.

   A hub with 150 entries is a lookup, not a gallery. Someone arrives from
   Google with one question already in their head; the page's whole job is to
   get them to it. So the controls are a filter and a set of jump links, and
   the rows are rows — not cards competing for equal attention.

   Descriptions are omitted on dense families on purpose. They're written as
   meta descriptions, which means they restate the title for a SERP audience.
   Repeating that under every row adds ~300 lines of grey text and makes the
   page unscannable. The journal keeps them, because an essay title genuinely
   doesn't tell you what the essay argues.
   ========================================================================= */

export type HubItem = {
  slug: string;
  href: string;
  title: string;
  description: string;
  cluster: string;
  clusterLabel: string;
};

export function HubBrowser({
  items,
  showDescriptions = false,
  noun = 'question',
}: {
  items: HubItem[];
  showDescriptions?: boolean;
  /** Used in the filter placeholder and the empty state. */
  noun?: string;
}): JSX.Element {
  const [q, setQ] = useState('');

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const matched = needle
      ? items.filter(
          (i) =>
            i.title.toLowerCase().includes(needle) ||
            i.description.toLowerCase().includes(needle) ||
            i.clusterLabel.toLowerCase().includes(needle)
        )
      : items;

    const map = new Map<string, { label: string; items: HubItem[] }>();
    for (const i of matched) {
      const g = map.get(i.cluster) ?? { label: i.clusterLabel, items: [] };
      g.items.push(i);
      map.set(i.cluster, g);
    }
    return [...map.entries()].map(([cluster, g]) => ({ cluster, ...g }));
  }, [items, q]);

  const shown = groups.reduce((n, g) => n + g.items.length, 0);
  const filtering = q.trim().length > 0;

  return (
    <div className="hb">
      <div className="hb-controls">
        <div className="hb-filter">
          <label className="hb-label" htmlFor="hb-input">
            Find a {noun}
          </label>
          <input
            id="hb-input"
            className="hb-input"
            type="search"
            autoComplete="off"
            placeholder={`Start typing — e.g. “cost”, “backlinks”, “agency”`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p className="hb-count" role="status" aria-live="polite">
          {filtering ? `${shown} of ${items.length}` : `${items.length} total`}
        </p>
      </div>

      {!filtering && groups.length > 1 ? (
        <nav className="hb-chips" aria-label="Jump to a section">
          {groups.map((g) => (
            <a key={g.cluster} href={`#c-${g.cluster}`}>
              {g.label}
              <span>{g.items.length}</span>
            </a>
          ))}
        </nav>
      ) : null}

      {shown === 0 ? (
        <p className="hb-empty">
          Nothing matches “{q}”. Try a broader word — or{' '}
          <Link href="/#book">ask us directly</Link>.
        </p>
      ) : null}

      {groups.map((g) => (
        <section className="hb-group" key={g.cluster} id={`c-${g.cluster}`}>
          <h2 className="hb-group-h">
            {g.label}
            <span className="hb-group-n">{g.items.length}</span>
          </h2>
          <ul className={`hb-list${showDescriptions ? ' rich' : ''}`}>
            {g.items.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>
                  <span className="hb-title">{i.title}</span>
                  {showDescriptions ? <span className="hb-desc">{i.description}</span> : null}
                  <span className="hb-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
