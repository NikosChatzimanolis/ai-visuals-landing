// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Visuals for Cyprus | Done-for-you food photos & short videos",
    template: "%s | Visuals for Cyprus",
  },
  description:
    "Done-for-you images and short videos for restaurants and small businesses in Cyprus. No photoshoot. You send a brief, we deliver ready-to-post visuals.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Visuals for Cyprus",
    description:
      "Professional food photos and short videos—without a photoshoot. Done-for-you visuals for Cyprus businesses.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visuals for Cyprus",
    description:
      "Done-for-you visuals for restaurants & small businesses in Cyprus. Fast delivery. Ready-to-post.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
