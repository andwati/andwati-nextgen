import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage(site.name, "Software engineer · CTF player");
}
