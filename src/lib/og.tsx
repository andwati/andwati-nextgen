import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** 1200x630 social card: title on white, name and domain along the bottom. */
export function ogImage(title: string, kicker?: string) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        color: "#1a202c",
        padding: "72px 80px",
        borderLeft: "16px solid #2b6cb0",
      }}
    >
      <div
        style={{
          fontSize: 30,
          color: "#718096",
          textTransform: "uppercase",
          letterSpacing: 3,
        }}
      >
        {kicker ?? ""}
      </div>
      <div
        style={{
          fontSize: title.length > 60 ? 56 : 72,
          fontWeight: 700,
          lineHeight: 1.15,
          display: "flex",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 30,
        }}
      >
        <span style={{ color: "#1a202c" }}>{site.name}</span>
        <span style={{ color: "#718096" }}>andwati.com</span>
      </div>
    </div>,
    ogSize,
  );
}
