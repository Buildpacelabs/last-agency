import type { CSSProperties, ReactElement } from 'react';

export type ClientLogoVariant =
  | 'all-caps'
  | 'lowercase-dot'
  | 'custom-ligature'
  | 'accent-dot'
  | 'monospace'
  | 'italic-stroke'
  | 'condensed'
  | 'outlined';

export type ClientLogoProps = {
  name: string;
  variant: ClientLogoVariant;
  accentColor?: string;
  className?: string;
};

const DEFAULT_ACCENT = '#FF6B35';

const baseSpan = 'inline-flex items-baseline font-display leading-none';

export function ClientLogo({
  name,
  variant,
  accentColor = DEFAULT_ACCENT,
  className,
}: ClientLogoProps): ReactElement {
  const cls = [baseSpan, className].filter(Boolean).join(' ');
  const title = `${name} wordmark`;

  switch (variant) {
    case 'all-caps':
      return renderAllCaps(name, accentColor, cls, title);
    case 'lowercase-dot':
      return renderLowercaseDot(name, accentColor, cls, title);
    case 'custom-ligature':
      return renderCustomLigature(name, accentColor, cls, title);
    case 'accent-dot':
      return renderAccentDot(name, accentColor, cls, title);
    case 'monospace':
      return renderMonospace(name, accentColor, cls, title);
    case 'italic-stroke':
      return renderItalicStroke(name, accentColor, cls, title);
    case 'condensed':
      return renderCondensed(name, accentColor, cls, title);
    case 'outlined':
      return renderOutlined(name, accentColor, cls, title);
    default:
      return (
        <span className={cls} role="img" aria-label={title}>
          {name}
        </span>
      );
  }
}

function renderAllCaps(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  // Stacked two-line all-caps; if a single word, render on one line.
  const parts = name.trim().split(/\s+/);
  const accentStyle: CSSProperties = { color: accent };

  if (parts.length >= 2) {
    const [first, ...rest] = parts;
    const second = rest.join(' ');
    return (
      <span
        className={`${cls} flex-col items-start font-bold uppercase tracking-tight`}
        role="img"
        aria-label={title}
        style={{ letterSpacing: '-0.02em' }}
      >
        <span className="block">{first}</span>
        <span className="block">
          <span style={accentStyle}>{second.charAt(0)}</span>
          {second.slice(1)}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`${cls} font-bold uppercase tracking-tight`}
      role="img"
      aria-label={title}
      style={{ letterSpacing: '-0.02em' }}
    >
      <span style={accentStyle}>{name.charAt(0)}</span>
      {name.slice(1).toUpperCase()}
    </span>
  );
}

function renderLowercaseDot(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  const base = name.replace(/\.+$/u, '').toLowerCase();
  return (
    <span
      className={`${cls} font-bold lowercase`}
      role="img"
      aria-label={title}
      style={{ letterSpacing: '-0.03em' }}
    >
      <span>{base}</span>
      <span style={{ color: accent }}>.</span>
    </span>
  );
}

function renderCustomLigature(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  // SVG-based, with two adjacent letters overlapped to read as one ligature.
  // Pick the first repeat of any adjacent letter pair; otherwise overlap chars 1-2.
  const idx = pickLigatureIndex(name);
  const before = name.slice(0, idx);
  const a = name.charAt(idx);
  const b = name.charAt(idx + 1);
  const after = name.slice(idx + 2);

  const fontFamily = 'var(--font-display), ui-sans-serif, system-ui';

  return (
    <svg
      className={cls}
      role="img"
      aria-label={title}
      viewBox="0 0 360 64"
      width="100%"
      height="auto"
      preserveAspectRatio="xMinYMid meet"
    >
      <title>{title}</title>
      <g
        fill="currentColor"
        fontFamily={fontFamily}
        fontWeight={600}
        fontSize={48}
      >
        <text x="0" y="48" textLength={Math.max(before.length * 24, 1)} lengthAdjust="spacingAndGlyphs">
          {before}
        </text>
        <text x={before.length * 24} y="48">
          {a}
        </text>
        <text x={before.length * 24 + 16} y="48" fill={accent}>
          {b}
        </text>
        <text x={before.length * 24 + 16 + 24} y="48">
          {after}
        </text>
      </g>
      <line
        x1={before.length * 24}
        x2={before.length * 24 + 38}
        y1={28}
        y2={28}
        stroke={accent}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}

function pickLigatureIndex(name: string): number {
  for (let i = 0; i < name.length - 1; i += 1) {
    const a = name.charAt(i);
    const b = name.charAt(i + 1);
    if (/[a-z]/i.test(a) && /[a-z]/i.test(b)) {
      return i;
    }
  }
  return 0;
}

function renderAccentDot(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  // Split on middle dot OR any whitespace.
  const parts = name.split(/[·•]|\s+/).filter(Boolean);
  if (parts.length < 2) {
    return (
      <span className={`${cls} font-medium`} role="img" aria-label={title}>
        <span style={{ fontFamily: 'var(--font-display), serif' }}>{name}</span>
      </span>
    );
  }
  return (
    <span
      className={`${cls} font-medium`}
      role="img"
      aria-label={title}
      style={{ fontFamily: 'var(--font-display), serif', letterSpacing: '-0.01em' }}
    >
      <span>{parts[0]}</span>
      <span aria-hidden="true" style={{ color: accent, padding: '0 0.35ch', fontWeight: 700 }}>
        ·
      </span>
      <span>{parts.slice(1).join(' ')}</span>
    </span>
  );
}

function renderMonospace(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  // Lowercase mono; render any '/' in accent.
  const lower = name.toLowerCase();
  const tokens: ReactElement[] = [];
  for (let i = 0; i < lower.length; i += 1) {
    const ch = lower.charAt(i);
    if (ch === '/') {
      tokens.push(
        <span key={`s-${i}`} style={{ color: accent }}>
          /
        </span>,
      );
    } else {
      tokens.push(<span key={`c-${i}`}>{ch}</span>);
    }
  }
  return (
    <span
      className={`${cls} font-medium`}
      role="img"
      aria-label={title}
      style={{
        fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
        letterSpacing: '0',
      }}
    >
      {tokens}
    </span>
  );
}

function renderItalicStroke(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  // Italic display serif with an accent underline beneath the second half of the word.
  const split = Math.ceil(name.length / 2);
  const first = name.slice(0, split);
  const second = name.slice(split);

  return (
    <span
      className={cls}
      role="img"
      aria-label={title}
      style={{
        fontFamily: 'var(--font-display), Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 500,
        letterSpacing: '-0.01em',
      }}
    >
      <span>{first}</span>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span>{second}</span>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '-0.12em',
            height: '0.08em',
            background: accent,
            display: 'block',
          }}
        />
      </span>
    </span>
  );
}

function renderCondensed(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  // Lowercase narrow condensed; render '&' in accent; extra tracking on trailing word.
  const lower = name.toLowerCase();
  const ampIdx = lower.indexOf('&');
  if (ampIdx === -1) {
    return (
      <span
        className={`${cls} font-medium lowercase`}
        role="img"
        aria-label={title}
        style={{ fontStretch: 'condensed', letterSpacing: '-0.01em' }}
      >
        {lower}
      </span>
    );
  }
  const before = lower.slice(0, ampIdx);
  const after = lower.slice(ampIdx + 1);
  return (
    <span
      className={`${cls} font-medium lowercase`}
      role="img"
      aria-label={title}
      style={{ fontStretch: 'condensed', letterSpacing: '-0.01em' }}
    >
      <span>{before}</span>
      <span style={{ color: accent, padding: '0 0.05ch' }}>&amp;</span>
      <span style={{ letterSpacing: '0.18em' }}>{after.trim()}</span>
    </span>
  );
}

function renderOutlined(
  name: string,
  accent: string,
  cls: string,
  title: string,
): ReactElement {
  const text = name.toUpperCase();
  const fontFamily = 'var(--font-display), Georgia, serif';

  // Width-aware SVG so the outline scales cleanly.
  const charWidth = 36;
  const padding = 8;
  const blockSize = 14;
  const blockGap = 8;
  const textWidth = text.length * charWidth;
  const totalWidth = padding + textWidth + blockGap + blockSize + padding;

  return (
    <svg
      className={cls}
      role="img"
      aria-label={title}
      viewBox={`0 0 ${totalWidth} 64`}
      width="100%"
      height="auto"
      preserveAspectRatio="xMinYMid meet"
    >
      <title>{title}</title>
      <text
        x={padding}
        y={48}
        fontFamily={fontFamily}
        fontWeight={700}
        fontSize={44}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        letterSpacing="0.02em"
      >
        {text}
      </text>
      <rect
        x={padding + textWidth + blockGap}
        y={36}
        width={blockSize}
        height={blockSize}
        fill={accent}
      />
    </svg>
  );
}

export default ClientLogo;
