import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";
import "@/components/product-demo/product-demo.css";
import "@/components/brand/brand.css";
import "@/components/workflow/workflow.css";
import "@/components/features/work-illustration.css";
import "@/components/product-demo/connected-motion.css";
import "@/components/product-demo/calendar-view.css";
import "@/components/story/section-alignment.css";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "optional",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "optional",
  preload: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Keikora | Operations Software for Local Service Businesses",
    template: "%s | Keikora",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_FI",
    siteName: siteConfig.name,
    title: "Bookings meet availability. Work gets coordinated.",
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/brand/social-card.png",
        width: 1200,
        height: 630,
        alt: "Keikora — Connected booking administration, availability and assignments. Broader platform in development.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keikora | A clearer working day",
    description: siteConfig.description,
    images: ["/brand/social-card.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}/brand/keikora_logo.png`,
        description:
          "The product direction emerging from implemented service-business operations software in Oulu, Finland.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
      },
    ],
  };
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
