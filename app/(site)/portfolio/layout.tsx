import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Browse selected B2B prospect research projects and case studies—custom company research, decision-maker discovery, contact enrichment, and verified CRM-ready data delivery.",
  path: "/portfolio",
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
