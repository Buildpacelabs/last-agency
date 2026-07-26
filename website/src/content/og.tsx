import { ImageResponse } from 'next/og';
import { getPage } from './loader';
import { TYPE_LABEL, type PageType } from './types';

/* =========================================================================
   Per-page Open Graph images.

   Without this every one of ~500 URLs shares the homepage card, so a link to
   a glossary term and a link to a city page look identical in a WhatsApp
   preview or an X card. Since a large share of this site's early distribution
   will be someone pasting a link into a founder group chat, the card is doing
   real work.

   Satori (the renderer behind ImageResponse) requires an explicit `display`
   on every element with more than one child — hence the flex everywhere.
   ========================================================================= */

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Scale the headline down as it gets longer, so it never overflows the card. */
function fontSizeFor(text: string): number {
  if (text.length > 110) return 46;
  if (text.length > 80) return 54;
  if (text.length > 55) return 64;
  return 76;
}

export function contentOgImage(type: PageType, slug: string): ImageResponse {
  const page = getPage(type, slug);
  const headline = page?.h1 ?? 'Last Agency';
  const kicker = TYPE_LABEL[type];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#14100c',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand lockup + section label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '999px',
                background: '#ff2e12',
                display: 'flex',
              }}
            />
            <div style={{ display: 'flex', fontSize: '34px', fontWeight: 800, letterSpacing: '-1px' }}>
              {/* Satori collapses &nbsp;, so the word gap is set explicitly. */}
              <span style={{ color: '#f7efe0', marginRight: '12px' }}>LAST</span>
              <span style={{ color: '#ff2e12' }}>AGENCY</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              color: '#ff2e12',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            {kicker}
          </div>
        </div>

        {/* Headline, with the red rule that runs through the whole site */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', width: '120px', height: '8px', background: '#ff2e12', marginBottom: '28px' }} />
          <div
            style={{
              display: 'flex',
              fontSize: fontSizeFor(headline),
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-2px',
              color: '#f7efe0',
              maxWidth: '1040px',
            }}
          >
            {headline}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              background: '#ffd21e',
              color: '#14100c',
              fontSize: '24px',
              fontWeight: 800,
              padding: '10px 18px',
              borderRadius: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            GUARANTEED OR IT&apos;S FREE
          </div>
          <div style={{ display: 'flex', color: '#e7dcc7', fontSize: '22px' }}>
            lastagencyhere.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
