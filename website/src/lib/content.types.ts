export type CaseStudyNarrative = {
  preEngagement: string;
  build: string;
  run: string;
  handoff: string;
  exit: string;
};

export type CaseStudyMetrics = {
  roas: string;
  cacReduction: string;
  revenueScale: string;
  timeToInHouse: string;
};

export type CaseStudyFounder = {
  name: string;
  role: string;
  city: string;
};

export type CaseStudy = {
  slug: string;
  brandName: string;
  industry: string;
  headline: string;
  services: string[];
  narrative: CaseStudyNarrative;
  metrics: CaseStudyMetrics;
  founder: CaseStudyFounder;
  testimonial: string;
  accentColor: string;
  handoffDate: string;
  _isSample?: boolean;
};

export type Testimonial = {
  quote: string;
  founder: string;
  brand: string;
  role: string;
  _isSample?: boolean;
};

export type SeoSchema = Record<string, unknown>;

export type SeoEntry = {
  title: string;
  description: string;
  ogImage?: string;
  ogImageStrategy?: string;
  keywords?: string[];
  canonical?: string;
  schema?: SeoSchema;
};

export type SeoFile = {
  _meta?: Record<string, unknown>;
  _keywords?: string[];
} & Record<string, SeoEntry | Record<string, unknown> | undefined>;

export type AssetClientLogoProps = {
  name: string;
  variant: string;
  accentColor: string;
};

export type AssetFounderAvatarProps = {
  initials: string;
  gradient: { from: string; to: string };
};

export type AssetResultChartData = {
  metric: string;
  data: number[];
  accentColor: string;
  label: string;
};

export type CaseStudyAsset = {
  slug: string;
  hero: string;
  alt: string;
  clientLogoProps: AssetClientLogoProps;
  founderAvatarProps: AssetFounderAvatarProps;
  resultChartData: AssetResultChartData;
};

export type AssetManifest = {
  brand: {
    logo: string;
    logoMark: string;
    heroVideo: string;
    ogImage: string;
  };
  pages: {
    about: string[];
    services: string;
    contact: string;
  };
  caseStudies: CaseStudyAsset[];
};

export type BrandStyling = Record<string, unknown>;
