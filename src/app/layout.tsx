import type { Metadata, Viewport } from "next";
import { Lora } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/JsonLd";
import { Layout } from "@/components/Layout";
import { site } from "@/lib/site";
import "./globals.css";
import "katex/dist/katex.min.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#ffffff" };

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.baseUrl }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: site.locale,
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    creator: site.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  alternateName: site.tagline,
  url: site.baseUrl,
  inLanguage: "en",
  author: { "@type": "Person", name: site.name },
};

const umamiScript = process.env.PUBLIC_UMAMI_SCRIPT_URL;
const umamiId = process.env.PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={lora.variable}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${site.name} RSS`}
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title={`${site.name} JSON Feed`}
          href="/feed.json"
        />
      </head>
      <body>
        <JsonLd data={websiteLd} />
        <Layout>{children}</Layout>
        {umamiScript && umamiId && (
          <Script defer src={umamiScript} data-website-id={umamiId} />
        )}
      </body>
    </html>
  );
}
