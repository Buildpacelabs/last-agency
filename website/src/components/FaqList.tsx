import type { Faq } from '@/lib/site';

export function FaqList({ items, openFirst = true }: { items: Faq[]; openFirst?: boolean }): JSX.Element {
  return (
    <div className="wrap faq">
      {items.map((f, i) => (
        <details key={i} open={openFirst && i === 0}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
