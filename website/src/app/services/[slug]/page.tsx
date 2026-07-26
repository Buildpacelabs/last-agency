import type { Metadata } from 'next';
import { DetailPage, detailMetadata, detailParams } from '@/content/render';

const TYPE = 'services' as const;

// Anything not in the content directory is a genuine 404, not a rendered
// empty page. Keeps the crawlable URL space finite.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return detailParams(TYPE);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return detailMetadata(TYPE, params.slug);
}

export default function Page({ params }: { params: { slug: string } }): JSX.Element {
  return <DetailPage type={TYPE} slug={params.slug} />;
}
