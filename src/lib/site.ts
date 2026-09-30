export const site = {
  name: "Ian Andwati",
  alias: "mockingspectre",
  title: "Ian Andwati (mockingspectre) | Software Engineer & CTF Player",
  tagline: "Thoughts and musings",
  description:
    "Software engineer and captain of the binarysith CTF team. Essays on low-level programming, distributed systems, compilers, database internals and security.",
  baseUrl: "https://andwati.com",
  locale: "en_US",
  twitter: "@andwati_",
  keywords: [
    "Ian Andwati",
    "mockingspectre",
    "binarysith",
    "software engineering",
    "cyber security",
    "CTF writeups",
    "binary exploitation",
    "reverse engineering",
    "low-level programming",
    "distributed systems",
    "compiler design",
    "database internals",
  ],
  nav: [
    { name: "Home", href: "/" },
    { name: "Reading", href: "/reading" },
    { name: "Writing", href: "/writing" },
    { name: "Portfolio", href: "/portfolio" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/andwati" },
    { name: "Twitter", href: "https://twitter.com/andwati_" },
    { name: "YouTube", href: "https://www.youtube.com/@pwnforfunandprofit" },
    { name: "Email", href: "mailto:andwatiian@gmail.com" },
  ],
  sameAs: [
    "https://github.com/andwati",
    "https://twitter.com/andwati_",
    "https://www.youtube.com/@pwnforfunandprofit",
    "https://ctftime.org/team/379200",
  ],
};

export const abs = (path: string) => new URL(path, site.baseUrl).toString();
