import { PortfolioStrip } from './PortfolioStrip';
import { getAllCaseStudies, getAssetManifest } from '@/lib/content';

export function PortfolioStripA(): JSX.Element {
  const studies = getAllCaseStudies().slice(0, 5);
  const manifest = getAssetManifest();

  return (
    <PortfolioStrip
      studies={studies}
      manifest={manifest}
      label="the work"
      heading="the work. fourteen exits. still running."
      intro="Each card shows the brand, the work, and the months they've been running standalone since the handoff date."
      headingId="portfolio-strip-a-heading"
    />
  );
}
