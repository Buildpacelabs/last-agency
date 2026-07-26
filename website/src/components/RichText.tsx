import Link from 'next/link';
import { Fragment } from 'react';

/* =========================================================================
   Minimal inline formatter for body copy written by content authors.

   Supports exactly four things, on purpose:
     [label](/internal-path)  →  next/link
     [label](https://ext)     →  <a rel="noopener noreferrer" target="_blank">
     **bold**                 →  <strong>
     `code`                   →  <code>

   Parsed into React nodes rather than injected as HTML — content files are
   data, and data should never reach dangerouslySetInnerHTML.
   ========================================================================= */

const TOKEN = /(\[[^\]\n]+\]\([^)\s]+\)|\*\*[^*\n]+\*\*|`[^`\n]+`)/g;
// Separate, non-global twin used for the per-part check. Reusing TOKEN here
// would carry `lastIndex` between calls and mis-classify alternate tokens.
const IS_TOKEN = /^(\[[^\]\n]+\]\([^)\s]+\)|\*\*[^*\n]+\*\*|`[^`\n]+`)$/;

function renderToken(tok: string, key: number): JSX.Element | string {
  if (tok.startsWith('[')) {
    const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(tok);
    if (!m) return tok;
    const [, label, href] = m;
    if (href.startsWith('/')) {
      return (
        <Link key={key} href={href}>
          {label}
        </Link>
      );
    }
    return (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  if (tok.startsWith('**')) {
    return <strong key={key}>{tok.slice(2, -2)}</strong>;
  }

  if (tok.startsWith('`')) {
    return <code key={key}>{tok.slice(1, -1)}</code>;
  }

  return tok;
}

export function RichText({ text }: { text: string }): JSX.Element {
  const parts = text.split(TOKEN).filter((p) => p !== '');
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{IS_TOKEN.test(p) ? renderToken(p, i) : p}</Fragment>
      ))}
    </>
  );
}

/** Strip the inline markup — for meta descriptions, JSON-LD and alt text. */
export function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');
}
