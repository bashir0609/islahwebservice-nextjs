import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research Services",
  description:
    "B2B prospect research built around your criteria: company research, decision-maker discovery, contact enrichment, and verification delivered as CRM-ready prospect data.",
  path: "/b2b-prospect-research",
});

export default function B2BProspectResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
