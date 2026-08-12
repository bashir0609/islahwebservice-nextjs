import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research & Lead Generation Blog",
  description:
    "Practical guides on B2B prospect research, prospect list building, decision-maker discovery, contact enrichment, and email verification.",
  path: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
