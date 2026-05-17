import type {
  AssetManifest,
  BrandStyling,
  CaseStudy,
  SeoEntry,
  SeoFile,
  Testimonial,
} from './content.types';

import caseStudiesJson from '../content/case-studies.json';
import testimonialsJson from '../content/testimonials.json';
import seoJson from '../content/seo.json';
import assetManifestJson from '../content/asset-manifest.json';
import brandStylingJson from '../content/brand-styling.json';

const caseStudies = caseStudiesJson as unknown as CaseStudy[];
const testimonials = testimonialsJson as unknown as Testimonial[];
const seo = seoJson as unknown as SeoFile;
const assetManifest = assetManifestJson as unknown as AssetManifest;
const brandStyling = brandStylingJson as unknown as BrandStyling;

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getMarqueeTestimonials(): Testimonial[] {
  return testimonials;
}

export function getSeoForRoute(route: string): SeoEntry | undefined {
  const entry = seo[route];
  if (entry && typeof entry === 'object' && 'title' in entry && 'description' in entry) {
    return entry as SeoEntry;
  }
  return undefined;
}

export function getAssetManifest(): AssetManifest {
  return assetManifest;
}

export function getBrandStyling(): BrandStyling {
  return brandStyling;
}
