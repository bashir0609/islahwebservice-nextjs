import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Lead Generation Data Services",
  description:
    "B2B lead generation data services: companies researched against your criteria, requested decision-makers identified, contact details enriched and verified, and delivered CRM-ready.",
  path: "/b2b-lead-generation",
});

export default function B2BLeadGenerationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
