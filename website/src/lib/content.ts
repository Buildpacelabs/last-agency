import fs from 'node:fs';
import path from 'node:path';
import type {
  AssetManifest,
  BrandStyling,
  CaseStudy,
  SeoEntry,
  SeoFile,
  Testimonial,
} from './content.types';

/**
 * Resolves the output/ directory at the workspace root. The output JSON files
 * live as siblings of website/, so we walk one level up from process.cwd().
 */
const OUTPUT_DIR = path.resolve(process.cwd(), '..', 'output');

function readJson<T>(filename: string): T {
  const filePath = path.join(OUTPUT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

let caseStudiesCache: CaseStudy[] | null = null;
let testimonialsCache: Testimonial[] | null = null;
let seoCache: SeoFile | null = null;
let assetManifestCache: AssetManifest | null = null;
let brandStylingCache: BrandStyling | null = null;

export function getAllCaseStudies(): CaseStudy[] {
  if (!caseStudiesCache) {
    caseStudiesCache = readJson<CaseStudy[]>('case-studies.json');
  }
  return caseStudiesCache;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((c) => c.slug === slug);
}

export function getMarqueeTestimonials(): Testimonial[] {
  if (!testimonialsCache) {
    testimonialsCache = readJson<Testimonial[]>('testimonials.json');
  }
  return testimonialsCache;
}

function getSeoFile(): SeoFile {
  if (!seoCache) {
    seoCache = readJson<SeoFile>('seo.json');
  }
  return seoCache;
}

export function getSeoForRoute(route: string): SeoEntry | undefined {
  const file = getSeoFile();
  const entry = file[route];
  if (entry && typeof entry === 'object' && 'title' in entry && 'description' in entry) {
    return entry as SeoEntry;
  }
  return undefined;
}

export function getAssetManifest(): AssetManifest {
  if (!assetManifestCache) {
    assetManifestCache = readJson<AssetManifest>('asset-manifest.json');
  }
  return assetManifestCache;
}

export function getBrandStyling(): BrandStyling {
  if (!brandStylingCache) {
    brandStylingCache = readJson<BrandStyling>('brand-styling.json');
  }
  return brandStylingCache;
}
