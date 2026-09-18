import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Professional Services Prospect Lists",
  description:
    "Get custom prospect research for consultancies and professional services firms, with companies and contacts matched to your criteria and prepared for CRM.",
  path: "/industries/professional-services",
});

export default function ProfessionalServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
