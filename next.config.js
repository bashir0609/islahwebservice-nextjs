/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Keep the admin area out of search indexes (belt-and-braces with robots.txt).
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        // Hardened, SEO-friendly headers on every public response.
        // NOTE: no Cache-Control here so Next.js asset caching (_next/static)
        // and its own page/ISR caching are never overridden.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // API responses must never be cached client-side.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "islahwebservice.com",
          },
        ],
        destination: "https://www.islahwebservice.com/",
        permanent: true,
      },
      {
        source: "/robots.txt",
        has: [
          {
            type: "host",
            value: "islahwebservice.com",
          },
        ],
        destination: "https://www.islahwebservice.com/robots.txt",
        permanent: true,
      },
      // Architecture consolidation (2026): the site now presents ONE core
      // service (B2B Prospect Research) with industry applications. The old
      // stage-of-service pages 301 to the master service page. Destinations
      // are FINAL (no chains): any older /services/* redirect also lands
      // directly on its final page.
      {
        source: "/prospect-list-building",
        destination: "/b2b-prospect-research",
        permanent: true,
      },
      {
        source: "/decision-maker-research",
        destination: "/b2b-prospect-research",
        permanent: true,
      },
      {
        // "B2B lead generation" is now the homepage's broad-market positioning.
        source: "/b2b-lead-generation",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/verified-b2b-contact-lists",
        destination: "/b2b-prospect-research",
        permanent: true,
      },
      {
        source: "/services/lead-generation-analysis",
        destination: "/b2b-prospect-research",
        permanent: true,
      },
      {
        source: "/services/business-process-automation",
        destination: "/b2b-prospect-research",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
