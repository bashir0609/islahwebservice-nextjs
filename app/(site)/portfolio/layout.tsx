import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research Case Studies",
  description:
    "Case studies in B2B prospect research — company research, decision-maker discovery, contact enrichment, email verification, and verified CRM-ready prospect data delivery.",
  path: "/portfolio",
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
