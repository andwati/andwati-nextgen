import type { MetadataRoute } from "next";
import { getBooks, getWritings } from "@/lib/content";
import { abs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getWritings();
  const latest = posts[0]?.data.date;
  return [
    { url: abs("/"), changeFrequency: "monthly", priority: 1 },
    {
      url: abs("/writing"),
      lastModified: latest ? new Date(String(latest)) : undefined,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: abs("/reading"), changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/portfolio"), changeFrequency: "monthly", priority: 0.6 },
    ...posts.map((p) => ({
      url: abs(`/writing/${p.slug}`),
      lastModified: new Date(String(p.data.date)),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...getBooks().map((b) => ({
      url: abs(`/reading/${b.slug}`),
      lastModified: b.data.dateFinished
        ? new Date(b.data.dateFinished)
        : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
