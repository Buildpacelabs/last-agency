import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Last Agency — SEO, Social & Performance',
    short_name: 'Last Agency',
    description:
      "One team for SEO, organic social and paid media, on one guarantee: beat your 90-day baseline or you don't pay.",
    start_url: '/',
    display: 'standalone',
    background_color: '#14100c',
    theme_color: '#14100c',
    lang: 'en-IN',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
