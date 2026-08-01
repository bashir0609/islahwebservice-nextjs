import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Services for USA, UK & Australia",
  description:
    "Verified B2B contact lists, lead generation analysis, and business process automation services for companies in the USA, UK, and Australia.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
