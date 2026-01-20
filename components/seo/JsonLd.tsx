// src/components/seo/JsonLd.tsx
import React from "react";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Visuals for Cyprus",
    areaServed: "CY",
    description:
      "Done-for-you images and short videos for restaurants, liquor stores, boutiques, and small businesses in Cyprus.",
    serviceType: ["Marketing Creative", "Image Creation", "Short Video Creation"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
