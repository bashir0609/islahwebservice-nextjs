import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Existing Database Enrichment & Contact Data Completion",
  description:
    "Complete and clean an existing prospect or CRM database: missing emails, phone numbers, LinkedIn URLs, job-title updates, company fields, email verification, deduplication, and record standardization.",
  path: "/contact-enrichment",
});

export default function ContactEnrichmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
