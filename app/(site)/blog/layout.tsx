import { pageMetadata } from "@/lib/seo";

const blogMetadata = pageMetadata({
  templateChildren: true,
  title: "B2B Lead Generation & Prospecting Blog",
  description:
    "Read practical guides to company research, contact enrichment, email verification, and data quality for building and maintaining useful B2B prospect lists.",
  path: "/blog",
});

export const metadata = {
  ...blogMetadata,
  alternates: {
    ...blogMetadata.alternates,
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
