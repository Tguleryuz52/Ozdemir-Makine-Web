import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  images: {
    // Sanity görsel CDN'i (makine görselleri next/image ile buradan gelir)
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

// Sentry sarmalayıcı. Kaynak harita (okunaklı stack trace) yüklemesi için ileride
// SENTRY_AUTH_TOKEN + org/project slug eklenecek; şimdilik hatalar yakalanır (minified trace).
export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  widenClientFileUpload: true,
});
