import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Day One",
    template: "%s · Day One",
  },
  description:
    "Done-for-you product photos and short videos for local businesses. See how your product could look — before you commit.",

  metadataBase: new URL("https://ai-visuals-landing-jare.vercel.app/"),

  openGraph: {
    title: "Day One",
    description:
      "Professional visuals for restaurants, liquor stores, boutiques, and small businesses.",
    url: "https://ai-visuals-landing-jare.vercel.app/",
    siteName: "Day One",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Day One — visual content for local businesses",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Day One",
    description:
      "Get a visual idea for your business. Done-for-you product photos and short videos.",
    images: ["/icon.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
