import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research & Lead Generation Blog",
  description:
    "Practical guides on B2B prospect research, decision-maker discovery, contact enrichment, data quality, and email verification.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
