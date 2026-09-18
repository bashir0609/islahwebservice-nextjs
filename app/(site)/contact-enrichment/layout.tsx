import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Contact Enrichment & Data Completion",
  description:
    "Complete and clean your existing CRM records with contact enrichment, current job titles, business email checks, deduplication, and consistent formatting.",
  path: "/contact-enrichment",
});

export default function ContactEnrichmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
