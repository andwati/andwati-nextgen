import { getFeedItems } from "@/lib/feed";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const items = await getFeedItems();
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: site.name,
    home_page_url: site.baseUrl,
    feed_url: abs("/feed.json"),
    description: site.description,
    language: "en",
    authors: [{ name: site.name, url: site.baseUrl }],
    items: items.map((i) => ({
      id: i.url,
      url: i.url,
      title: i.title,
      summary: i.description,
      content_html: i.html,
      date_published: i.date.toISOString(),
      tags: i.tags,
    })),
  };
  return new Response(JSON.stringify(feed), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
