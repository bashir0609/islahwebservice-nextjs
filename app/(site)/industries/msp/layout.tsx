import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lead Generation for MSPs",
  description:
    "Verified B2B prospect lists for Managed Service Providers. We help MSPs find local and regional businesses that need outsourced IT, managed security, and support.",
  path: "/industries/msp",
});

export default function MspLayout({ children }: { children: React.ReactNode }) {
  return children;
}
