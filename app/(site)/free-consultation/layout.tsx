import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free B2B Lead Generation Consultation",
  description:
    "Book a free B2B prospect research consultation. Discuss your targeting criteria, get a clear project scope and sample data, and a transparent plan — no obligation.",
  path: "/free-consultation",
});

export default function FreeConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
