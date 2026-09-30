import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Mdx } from "@/components/Mdx";
import { getAbout } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  url: site.baseUrl,
  jobTitle: "Software Engineer",
  description: site.description,
  sameAs: site.sameAs,
  knowsAbout: [
    "Cyber security",
    "Capture the flag",
    "Binary exploitation",
    "Reverse engineering",
    "Low-level programming",
    "Distributed systems",
    "Compiler design",
    "Database internals",
  ],
  memberOf: {
    "@type": "Organization",
    name: "binarysith",
    url: "https://ctftime.org/team/379200",
  },
};

export default function Home() {
  return (
    <div className="prose">
      <JsonLd data={personLd} />
      <Mdx source={getAbout()} />
    </div>
  );
}
