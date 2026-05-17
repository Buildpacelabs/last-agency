# Typography — Last Agency

> Final type pair for the marketing site. Locked by Architect, 2026-05-17.

---

## Pair

| Role | Family | Source | License | Weights used |
|---|---|---|---|---|
| Display | **Cabinet Grotesk** | Fontshare (Indian Type Foundry) | Free for personal + commercial use; SIL-style permissive | 500, 700 (variable font) |
| Body | **Inter** | Google Fonts | SIL Open Font License 1.1 | 400, 500, 600 (variable font) |

### Why this pair

- **Cabinet Grotesk** is opinionated, bold, slightly geometric — it carries the "big type, contrarian thesis" brief without being a Helvetica-clone. Its italic cuts give us the accent-word italic emphasis the reference uses without needing a separate display italic family. Indian foundry — light cultural alignment with a Bangalore/Mumbai-anchored agency, no overhead.
- **Inter** is the safest neutral-sans on the web: hinted aggressively for body sizes, broad weight range, variable, OFL, and ubiquitous so it caches well across CDNs. It steps out of the way and lets Cabinet do the talking.
- Both are commercial-clean. No foundry contact required, no per-domain license.

---

## Import strategy

`next/font/google` does **not** ship Cabinet Grotesk (it's Fontshare). Strategy:

1. **Inter** — load via `next/font/google`. Standard, zero-config.
2. **Cabinet Grotesk** — load via `next/font/local` from `./public/fonts/cabinet-grotesk/`. The Fontshare zip ships a variable WOFF2; we self-host that single file. Next handles preload + `font-display: swap` for local fonts too.

### File: `app/fonts.ts`

```ts
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

export const display = localFont({
  src: [
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Variable.woff2',
      style: 'normal',
      weight: '500 700',
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-VariableItalic.woff2',
      style: 'italic',
      weight: '500 700',
    },
  ],
  display: 'swap',
  variable: '--font-display',
  preload: true,
});
```

### Wired in `app/layout.tsx`

```tsx
import { body, display } from './fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="font-body bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
```

### Tailwind binding (`tailwind.config.ts`)

```ts
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
      body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
    },
  },
},
```

---

## Type scale (display / body / utility)

| Token | Use | Size (desktop / mobile) | Family | Weight | Line height | Tracking |
|---|---|---|---|---|---|---|
| `display-xl` | Homepage hero, philosophy anchor | 144 / 64 px | display | 700 | 0.95 | -0.02em |
| `display-lg` | Page H1 (work, services, about) | 96 / 48 px | display | 700 | 0.98 | -0.015em |
| `display-md` | Section H2, case study brand name | 64 / 40 px | display | 700 | 1.02 | -0.01em |
| `display-sm` | Discipline H3 | 40 / 28 px | display | 500 | 1.1 | -0.005em |
| `body-lg` | Lead paragraph, hero sub-copy | 22 / 18 px | body | 400 | 1.5 | 0 |
| `body-md` | Default body | 17 / 16 px | body | 400 | 1.6 | 0 |
| `body-sm` | Caption, metadata, footer | 14 / 13 px | body | 500 | 1.5 | 0.01em |
| `mono-anchor` | Marquee items, service tags | 14 px | body | 500 | 1 | 0.04em |
| `caps-anchor` | "RESULTS", "GET IN TOUCH", section anchors | 14 px | body | 600 | 1 | 0.12em, uppercase |

All scale tokens defined as utilities in `app/globals.css` `@layer components`. Mobile values applied via Tailwind responsive variants (`md:text-[144px]`) or `clamp()` for fluid display sizes.

---

## File paths

```
website/
├── app/fonts.ts                                # next/font setup
├── public/fonts/cabinet-grotesk/
│   ├── CabinetGrotesk-Variable.woff2           # Architect to download from Fontshare
│   ├── CabinetGrotesk-VariableItalic.woff2
│   └── LICENSE.md                              # ship the Fontshare license file with the asset
```

Inter is fully managed by `next/font/google` — no local files.

---

## Italic policy

- Italics are reserved for **accent words inside display headlines** (mirrors the reference's mixed-weight + italic accent moments).
- Never italicize body copy.
- Never italicize a full headline.
- One italic accent per headline maximum.

---

## Phase 3a implementation note (2026-05-17)

The scaffold ships with **Space Grotesk** wired as the display font, not Cabinet Grotesk. Reason: Cabinet Grotesk is Fontshare-only and the .woff2 files cannot be fetched programmatically in this build environment. Space Grotesk is the closest free Google Fonts equivalent (geometric grotesk, similar voice), so the site does not block on a font download.

### To swap in Cabinet Grotesk

1. Download Cabinet Grotesk from https://www.fontshare.com/fonts/cabinet-grotesk.
2. Drop these two files into `./website/public/fonts/cabinet-grotesk/`:
   - `CabinetGrotesk-Variable.woff2`
   - `CabinetGrotesk-VariableItalic.woff2`
3. Edit `./website/src/app/fonts.ts` and replace the `Space_Grotesk` block with the `localFont` block documented above. No other file changes are required — every consumer reads the `--font-display` CSS variable.

Tracked in `MANUAL-WORK.md` for Phase 5 handoff.
