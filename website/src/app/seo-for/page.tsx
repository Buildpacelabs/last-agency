import type { Metadata } from 'next';
import { HubPage, hubMetadata } from '@/content/render';

export const metadata: Metadata = hubMetadata('seo-for');

export default function Page(): JSX.Element {
  return <HubPage type="seo-for" />;
}
