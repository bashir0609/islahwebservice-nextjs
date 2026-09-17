import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Real Estate Prospect Research Services",
  description:
    "Research property owners and operators by location, asset type, and portfolio criteria, with relevant contacts and structured data prepared for your CRM.",
  path: "/industries/real-estate",
});

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
