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
      // NOTE: all legacy architecture redirects (/why-us, /b2b-lead-generation,
      // /decision-maker-research, /prospect-list-building, retired /services/*)
      // are emitted as literal 301s by proxy.ts so the redirect map is
      // unambiguous. Only host-level (non-www → www) redirects live here.
    ];
  },
};

module.exports = nextConfig;
