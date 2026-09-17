import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research by Industry",
  description:
    "Explore custom prospect research for SaaS, MSPs, recruitment, professional services, and real estate, built around industry-specific targeting criteria.",
  path: "/industries",
});

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
