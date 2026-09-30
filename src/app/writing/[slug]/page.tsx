import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbs, JsonLd } from "@/components/JsonLd";
import { Mdx } from "@/components/Mdx";
import { formatDate, getWritings } from "@/lib/content";
import { abs, site } from "@/lib/site";

export function generateStaticParams() {
  return getWritings().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritings().find((p) => p.slug === slug);
  if (!post) return {};
  const url = `/writing/${slug}`;
  const description = post.data.description || site.description;
  return {
    title: post.data.title,
    description,
    keywords: post.data.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.data.title,
      description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: String(post.data.date),
      modifiedTime: String(post.data.date),
      authors: [site.name],
      tags: post.data.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description,
    },
  };
}

export default async function Post({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getWritings().find((p) => p.slug === slug);
  if (!post) notFound();
  const url = abs(`/writing/${slug}`);
  const postLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description || site.description,
    datePublished: String(post.data.date),
    dateModified: String(post.data.date),
    inLanguage: "en",
    keywords: post.data.tags?.join(", "),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: abs(`/writing/${slug}/opengraph-image`),
    author: { "@type": "Person", name: site.name, url: site.baseUrl },
    publisher: { "@type": "Person", name: site.name, url: site.baseUrl },
  };
  return (
    <article className="flex flex-col gap-2">
      <JsonLd
        data={[
          postLd,
          breadcrumbs([
            { name: "Home", url: site.baseUrl },
            { name: "Writing", url: abs("/writing") },
            { name: post.data.title, url },
          ]),
        ]}
      />
      <h1 className="text-3xl font-bold md:text-4xl">{post.data.title}</h1>
      <time dateTime={String(post.data.date)} className="text-sm text-gray-500">
        {formatDate(String(post.data.date))}
      </time>
      <div className="prose">
        <Mdx source={post.content} />
      </div>
    </article>
  );
}
