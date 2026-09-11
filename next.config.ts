import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity görsel CDN'i (makine görselleri next/image ile buradan gelir)
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
