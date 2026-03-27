import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig: NextConfig = {
  cacheComponents: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
