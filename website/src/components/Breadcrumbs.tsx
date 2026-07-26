import Link from 'next/link';

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }): JSX.Element {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path}>
              {last ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <>
                  <Link href={c.path}>{c.name}</Link>
                  <span className="sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
