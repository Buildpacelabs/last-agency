import type { Faq } from '@/lib/site';
import { RichText } from './RichText';

/* FAQ copy is authored with the same inline markup as body copy. Rendering the
   raw string here printed literal backticks and `[label](/path)` to the page,
   and the intended internal links never became anchors. */

export function FaqList({ items, openFirst = true }: { items: Faq[]; openFirst?: boolean }): JSX.Element {
  return (
    <div className="wrap faq">
      {items.map((f, i) => (
        <details key={i} open={openFirst && i === 0}>
          <summary>
            <RichText text={f.q} />
          </summary>
          <p>
            <RichText text={f.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
