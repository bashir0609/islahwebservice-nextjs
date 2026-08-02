import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Lead Generation Services",
  description:
    "AI-powered B2B lead generation services: targeted prospect databases with verified decision-makers and CRM-ready contact information for outbound sales campaigns.",
  path: "/b2b-lead-generation",
});

export default function B2BLeadGenerationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
