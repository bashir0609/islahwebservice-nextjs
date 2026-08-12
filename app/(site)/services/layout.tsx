import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research & Lead Data Services",
  description:
    "B2B prospect research and lead data services for the USA, UK, and Australia: company research, decision-maker discovery, contact enrichment, email verification, and CRM-ready data delivery.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
