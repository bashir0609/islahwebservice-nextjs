import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Real Estate Lead Generation Services",
  description:
    "Real estate lead generation built on property and company research: research property owners, investors, and property-management companies by location, ownership, portfolio size, and asset type, with verified decision-maker contacts.",
  path: "/industries/real-estate",
});

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
