import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Lead Generation by Industry",
  description:
    "Industry-specific B2B lead generation research for SaaS, MSPs, recruitment firms, and professional services. Criteria-matched company research, decision-maker discovery, and verified CRM-ready prospect data.",
  path: "/industries",
});

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
