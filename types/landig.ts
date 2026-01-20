// src/types/landing.ts
export type NavItem = { href: string; label: string };

export type TrustItem = { title: string; desc: string };

export type IndustryItem = { title: string; desc: string };

export type BeforeAfterPair = {
  id: string;
  title: string;
  subtitle: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export type MediaType = "image" | "video";

export type ExampleCard = {
  id: string;
  tag: string;
  title: string;
  note: string;
  type: MediaType;

  /**
   * For images:
   *  - src is required and points to /public (e.g. /images/examples/foo.jpg)
   * For videos:
   *  - src is the MP4 path (e.g. /videos/skelly.mp4)
   *  - srcWebm is optional (e.g. /videos/skelly.webm)
   *  - poster is recommended (e.g. /videos/skelly.webp or /images/examples/skelly-poster.jpg)
   */
  src: string;
  srcWebm?: string;
  poster?: string;

  alt: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  desc: string;
  bullets: string[];
  highlight: boolean;
};

export type FAQItem = { q: string; a: string };
