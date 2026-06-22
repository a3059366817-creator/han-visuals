import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  // Vercel: native Next.js with SSR/SSG + image optimization
  // GitHub Pages: static export with basePath
  ...(isVercel
    ? {}
    : {
        output: "export",
        basePath: "/han-visuals",
        assetPrefix: "/han-visuals",
        trailingSlash: true,
      }),
  images: {
    // Vercel handles image optimization natively
    unoptimized: !isVercel,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
