import { PortfolioStrip } from './PortfolioStrip';
import { getAllCaseStudies, getAssetManifest } from '@/lib/content';

export function PortfolioStripB(): JSX.Element {
  const studies = getAllCaseStudies().slice(5, 8);
  const manifest = getAssetManifest();

  return (
    <PortfolioStrip
      studies={studies}
      manifest={manifest}
      label="more exits"
      heading="more exits."
      intro="Three more brands we built, ran, and walked away from. Each one still running on the playbook we left behind."
      headingId="portfolio-strip-b-heading"
      trailing={{
        kind: 'view-all',
        href: '/work',
        label: 'See every exit.',
        sub: 'all the work',
      }}
    />
  );
}
