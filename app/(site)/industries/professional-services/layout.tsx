import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lead Generation for Professional Services",
  description:
    "B2B lead generation for consultancies, agencies, and advisory firms. Build targeted prospect databases with verified decision-maker contacts for steady business development.",
  path: "/industries/professional-services",
});

export default function ProfessionalServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
