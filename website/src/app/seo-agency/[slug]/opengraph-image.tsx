import { contentOgImage, size, contentType } from '@/content/og';
import { getPage } from '@/content/loader';

export { size, contentType };
export const alt = 'Last Agency';

// Generated on first request and cached at the edge rather than prerendered —
// 500 build-time image renders would add minutes to every deploy for assets
// most visitors never see.
export const dynamicParams = true;

export default function Image({ params }: { params: { slug: string } }) {
  return contentOgImage('seo-agency', params.slug);
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPage('seo-agency', params.slug);
  return { alt: p?.h1 ?? 'Last Agency' };
}
