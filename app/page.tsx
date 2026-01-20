// src/app/page.tsx
import type { Metadata } from "next";

import type {
  BeforeAfterPair,
  ExampleCard,
  FAQItem,
  IndustryItem,
  NavItem,
  PricingPlan,
  TrustItem,
} from "../types/landig";


import JsonLd from "../components/seo/JsonLd";
import SiteHeader from "../components/sections/SiteHeader";
import HeroWithProof from "../components/sections/HeroWithProof";
import TrustStrip from "../components/sections/TrustStrip";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import IndustriesSection from "../components/sections/IndustriesSection";
import ExamplesSection from "../components/sections/ExamplesSection";
import PricingSection from "../components/sections/PricingSection";
import FAQSection from "../components/sections/FAQSection";
import RequestSection from "../components/sections/RequestSection";
import SiteFooter from "../components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Day One | Done-for-you product photos & short videos",
  description:
    "Done-for-you images and short videos for restaurants, liquor stores, boutiques, and small businesses in Cyprus. You brief us. We deliver ready-to-post visuals.",
};

/* ------------------------- DATA ------------------------- */

const nav: NavItem[] = [
  { href: "#how", label: "How it works" },
  { href: "#industries", label: "Industries" },
  { href: "#examples", label: "Examples" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const trustItems: TrustItem[] = [
  { title: "Done-for-you", desc: "No prompts. No tools. Send a brief like a designer." },
  { title: "Ready-to-post", desc: "Correct sizes for IG/FB, menus, web, and listings." },
  { title: "Commercial use", desc: "Use visuals for ads, promotions, and product pages." },
  { title: "Clear workflow", desc: "Brief → drafts → revisions → delivery." },
];

const industries: IndustryItem[] = [
  { title: "Restaurants & cafés", desc: "Menus, specials, Reels, delivery listings." },
  { title: "Liquor & convenience", desc: "Premium bottle shots, promos, bundles, ads." },
  { title: "Clothing & boutiques", desc: "New arrivals, lookbook posts, seasonal sales." },
  { title: "Beauty & services", desc: "Offer visuals, packages, before/after promos." },
  { title: "Local e-commerce", desc: "Product photos, hero banners, listing thumbnails." },
  { title: "Any small business", desc: "Promos, announcements, and branded content." },
];

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "whisky",
    title: "Liquor product shot",
    subtitle: "From plain cutout → premium scene",
    beforeSrc: "/images/before-after/whisky_before.webp",
    afterSrc: "/images/before-after/whisky_after.jpg",
    beforeAlt: "Original whisky bottle product photo on plain background.",
    afterAlt: "Marketing-ready whisky bottle photo in a premium setting.",
  },
  {
    id: "wine",
    title: "Wine lineup creative",
    subtitle: "From basic graphic → lifestyle scene",
    beforeSrc: "/images/before-after/wines_before.png",
    afterSrc: "/images/before-after/wine_after.jpg",
    beforeAlt: "Original wine lineup graphic with bottles and background panels.",
    afterAlt: "Marketing-ready wine scene with bottles in a lifestyle setting.",
  },
];

const exampleCards: ExampleCard[] = [
  {
    id: "ex-whisky",
    type: "image",
    tag: "Product",
    title: "Bottle hero shot",
    note: "Premium lighting and setting for stronger perceived value.",
    src: "/images/examples/whisky.jpg",
    alt: "Premium whisky bottle hero photo.",
  },
  {
    id: "ex-drinks-banner",
    type: "image",
    tag: "Promo",
    title: "Drinks banner",
    note: "Banner-ready creative for ads, web, and in-store screens.",
    src: "/images/examples/drinksbanner.jpg",
    alt: "Promotional drinks banner visual.",
  },
  {
    id: "ex-food",
    type: "image",
    tag: "Food",
    title: "Menu-ready dish",
    note: "Appetizing composition and clean presentation.",
    src: "/images/examples/food.jpg",
    alt: "Menu-ready food photo.",
  },
  {
    id: "ex-chocolate",
    type: "image",
    tag: "Retail",
    title: "Product spotlight",
    note: "Clean product focus for boutique/e-commerce listings.",
    src: "/images/examples/chocolatebox.jpg",
    alt: "Chocolate box product photo.",
  },
  {
    id: "ex-cocktail",
    type: "image",
    tag: "Lifestyle",
    title: "Lifestyle serve",
    note: "Context-driven visuals that feel premium and real.",
    src: "/images/examples/maracujabarman.jpg",
    alt: "Lifestyle drink image with bartender.",
  },
  {
  id: "ex-video-skelly",
  type: "video",
  tag: "Video",
  title: "Short loop example",
  note: "6–10s loop for Reels, Stories, and promo screens.",
  src: "/videos/skelly-optimized.mp4",
  poster: "/videos/skelly-poster.jpg",
  alt: "Short promotional video loop example.",
}
  
  
];

const pricing: PricingPlan[] = [
  {
    name: "Starter",
    price: "€149 / month",
    desc: "For small businesses that need a steady baseline of visuals.",
    bullets: [
      "8 images / month",
      "1 short video / month",
      "1 revision round per asset",
      "48–72h typical turnaround",
      "Commercial usage included",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "€299 / month",
    desc: "For consistent posting and frequent promotions.",
    bullets: [
      "20 images / month",
      "4 short videos / month",
      "2 revision rounds per asset",
      "24–72h typical turnaround",
      "Priority support (WhatsApp-friendly)",
      "Commercial usage included",
    ],
    highlight: true,
  },
  {
    name: "Campaign",
    price: "€449 / month",
    desc: "For busy teams needing frequent promos and ad variations.",
    bullets: [
      "40 images / month",
      "8 short videos / month",
      "2 revision rounds per asset",
      "24–48h typical turnaround",
      "Ad variations (formats + compositions)",
      "Commercial usage included",
    ],
    highlight: false,
  },
];

const faqs: FAQItem[] = [
  {
    q: "Do I need to write prompts or use an AI tool?",
    a: "No. You send a short brief and references. We handle generation and refinement.",
  },
  {
    q: "Can you match my brand style?",
    a: "Yes. We align typography, spacing, tone, and visual style for consistency.",
  },
  {
    q: "How fast is delivery?",
    a: "Typical turnaround is 24–72 hours depending on package and complexity.",
  },
];

/* ------------------------- PAGE ------------------------- */

export default function HomePage() {
  return (
    <>
      <JsonLd />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to content
      </a>

      <SiteHeader nav={nav} />

      <main id="main">
        <HeroWithProof pairs={beforeAfterPairs} />
        <TrustStrip items={trustItems} />
        <HowItWorksSection />
        <IndustriesSection items={industries} />
        <ExamplesSection cards={exampleCards} />
        <PricingSection plans={pricing} />
        <FAQSection items={faqs} />
        <RequestSection />
        <SiteFooter nav={nav} />
      </main>
    </>
  );
}
