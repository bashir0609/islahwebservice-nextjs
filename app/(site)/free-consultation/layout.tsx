import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free B2B Lead Generation Consultation",
  description:
    "Book a free B2B lead generation consultation. Get a personalized audit of your prospect pipeline, a custom roadmap, and free sample data — no obligation.",
  path: "/free-consultation",
});

export default function FreeConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
