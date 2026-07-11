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
    ];
  },
};

module.exports = nextConfig;
