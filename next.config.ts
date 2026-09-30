import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  // The site uses plain <img>, not next/image, so keep sharp's native libs out of the bundle.
  outputFileTracingExcludes: {
    "*": ["node_modules/.pnpm/@img+*/**", "node_modules/.pnpm/sharp@*/**"],
  },
};

export default nextConfig;
