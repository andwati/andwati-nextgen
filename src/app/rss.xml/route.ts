import { getFeedItems, xml } from "@/lib/feed";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const items = await getFeedItems();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
<title>${xml(site.name)}</title>
<link>${site.baseUrl}</link>
<description>${xml(site.description)}</description>
<language>en</language>
<lastBuildDate>${(items[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
<atom:link href="${abs("/rss.xml")}" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `<item>
<title>${xml(i.title)}</title>
<link>${i.url}</link>
<guid isPermaLink="true">${i.url}</guid>
<pubDate>${i.date.toUTCString()}</pubDate>
<description>${xml(i.description)}</description>
${i.tags.map((t) => `<category>${xml(t)}</category>`).join("\n")}
<content:encoded><![CDATA[${i.html.replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>
</item>`,
  )
  .join("\n")}
</channel>
</rss>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
