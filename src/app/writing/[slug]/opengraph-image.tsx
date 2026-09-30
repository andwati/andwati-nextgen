import { getWritings } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getWritings().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWritings().find((p) => p.slug === slug);
  return ogImage(post?.data.title ?? "Writing", "Writing");
}
