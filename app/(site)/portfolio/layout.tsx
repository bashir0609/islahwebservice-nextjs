import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research Case Studies",
  description:
    "Explore delivered company databases, contact enrichment, and role research projects to see how client criteria become structured, CRM-ready prospect data.",
  path: "/portfolio",
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
