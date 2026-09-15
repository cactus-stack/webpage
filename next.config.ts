import type { NextConfig } from "next";

// Security headers live in `public/_headers` and are applied by Cloudflare
// Workers static assets. A `headers()` function here has no effect once
// `output: "export"` is enabled, so the two must not be duplicated.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    // The exported site is served as plain files from the Cloudflare edge,
    // so there is no Next.js image optimizer at request time.
    unoptimized: true,
  },
};

export default nextConfig;
