import type { Metadata } from "next";
import { Mdx } from "@/components/Mdx";
import { getPortfolio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects and infrastructure-level software by Ian Andwati.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  const items = getPortfolio();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="sr-only">Portfolio</h1>
      <hr />
      {items.map((item) => (
        <div key={item.slug} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold">{item.data.title}</h2>
            <p className="pb-4 text-sm text-gray-600">
              {item.data.description}
            </p>
            <div className="prose text-sm text-gray-600">
              <Mdx source={item.content} />
            </div>
            <div className="flex gap-6 pt-2">
              {item.data.links?.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
