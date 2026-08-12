import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lead Generation for Professional Services",
  description:
    "Lead generation research for professional services firms: consultancies, agencies, accounting firms, and advisory firms. Criteria-matched company research with verified decision-maker contacts.",
  path: "/industries/professional-services",
});

export default function ProfessionalServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
