import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Enrichment Service",
  description:
    "Contact enrichment service: find missing emails, LinkedIn profiles, job titles, company data, and technologies. Complete your prospect records with verified business data.",
  path: "/contact-enrichment",
});

export default function ContactEnrichmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
