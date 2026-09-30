import { getBooks } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBooks().find((b) => b.slug === slug);
  return ogImage(book?.data.title ?? "Reading", "Reading");
}
