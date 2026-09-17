import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research & Lead Generation Blog",
  description:
    "Read practical guides to company research, contact enrichment, email verification, and data quality for building and maintaining useful B2B prospect lists.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
