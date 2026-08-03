import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Services for USA, UK & Australia",
  description:
    "B2B prospect research, prospect list building, decision-maker research, contact enrichment, and email verification services for companies in the USA, UK, and Australia.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
