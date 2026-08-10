import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * GitHub Pages serves static files only — there is no Node runtime — so the
   * whole site is exported to ./out at build time.
   *
   * Consequences of this mode, all of which the code already accounts for:
   *   - No server actions or API routes (the contact form posts to Web3Forms)
   *   - No on-demand image optimisation, hence images.unoptimized
   *   - No response headers; a headers() block here would be silently ignored,
   *     so security headers have to come from the markup instead
   */
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
