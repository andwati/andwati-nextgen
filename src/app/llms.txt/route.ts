import { getBooks, getWritings } from "@/lib/content";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} (also known as ${site.alias}) is a software engineer and the captain of the binarysith CTF team. This site collects his original essays, CTF writeups, reading list and projects.

## Writing

${getWritings()
  .map(
    (p) =>
      `- [${p.data.title}](${abs(`/writing/${p.slug}`)})${p.data.description ? `: ${p.data.description}` : ""}`,
  )
  .join("\n")}

## Reading

${getBooks()
  .map((b) => `- [${b.data.title}](${abs(`/reading/${b.slug}`)})`)
  .join("\n")}

## Other

- [About](${abs("/")})
- [Portfolio](${abs("/portfolio")})
- [RSS](${abs("/rss.xml")})
- [Sitemap](${abs("/sitemap.xml")})
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
