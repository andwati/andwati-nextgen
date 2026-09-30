import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbs, JsonLd } from "@/components/JsonLd";
import { Mdx } from "@/components/Mdx";
import { byline } from "@/lib/books";
import { getBooks } from "@/lib/content";
import { abs, site } from "@/lib/site";

export function generateStaticParams() {
  return getBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/reading/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const book = getBooks().find((b) => b.slug === slug);
  if (!book) return {};
  const url = `/reading/${slug}`;
  const description = byline(book.data) || site.description;
  return {
    title: book.data.title,
    description,
    keywords: book.data.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: book.data.title,
      description,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: book.data.title,
      description,
    },
  };
}

export default async function Book({ params }: PageProps<"/reading/[slug]">) {
  const { slug } = await params;
  const book = getBooks().find((b) => b.slug === slug);
  if (!book) notFound();
  const url = abs(`/reading/${slug}`);
  const item = {
    "@type": book.data.kind === "paper" ? "ScholarlyArticle" : "Book",
    name: book.data.title,
    url: book.data.url,
    author: book.data.authors?.map((name) => ({ "@type": "Person", name })),
  };
  const reviewLd = book.data.rating
    ? {
        "@context": "https://schema.org",
        "@type": "Review",
        url,
        name: `Review: ${book.data.title}`,
        datePublished: book.data.dateFinished,
        author: { "@type": "Person", name: site.name, url: site.baseUrl },
        itemReviewed: item,
        reviewRating: {
          "@type": "Rating",
          ratingValue: book.data.rating,
          bestRating: 5,
          worstRating: 1,
        },
      }
    : null;
  return (
    <article className="flex flex-col gap-2">
      <JsonLd
        data={[
          ...(reviewLd ? [reviewLd] : []),
          breadcrumbs([
            { name: "Home", url: site.baseUrl },
            { name: "Reading", url: abs("/reading") },
            { name: book.data.title, url },
          ]),
        ]}
      />
      <div className="flex flex-col">
        <h1 className="text-[36px] leading-[1.2] font-bold">
          {book.data.title}
        </h1>
        <p className="mt-2 text-[20px] leading-[30px] text-gray-400">
          {byline(book.data)}
        </p>
      </div>
      <div className="prose">
        <Mdx source={book.content} />
      </div>
    </article>
  );
}
