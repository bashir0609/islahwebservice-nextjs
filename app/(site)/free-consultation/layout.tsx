import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free Prospect Research Consultation",
  description:
    "Book a free consultation to discuss your targeting criteria, research scope, and sample data, with a clear plan for preparing your next prospect database.",
  path: "/free-consultation",
});

export default function FreeConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
