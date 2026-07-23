import { ImageResponse } from 'next/og';

export const alt = "Last Agency — SEO, social & performance, guaranteed or it's free";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage(): ImageResponse {
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
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '999px', background: '#ff2e12', display: 'flex' }} />
          <div style={{ display: 'flex', fontSize: '40px', fontWeight: 800, letterSpacing: '-1px' }}>
            <span style={{ color: '#f7efe0' }}>LAST&nbsp;</span>
            <span style={{ color: '#ff2e12' }}>AGENCY</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '82px',
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: '-3px',
              color: '#f7efe0',
              maxWidth: '1000px',
            }}
          >
            Fire your agencies. Hire the last one you&apos;ll ever need.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              background: '#ffd21e',
              color: '#14100c',
              fontSize: '30px',
              fontWeight: 800,
              padding: '12px 22px',
              borderRadius: '10px',
              letterSpacing: '-1px',
            }}
          >
            GUARANTEED OR IT&apos;S FREE
          </div>
          <div style={{ display: 'flex', color: '#e7dcc7', fontSize: '26px' }}>
            SEO · Social · Paid · No lock-in
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
