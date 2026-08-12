import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SaaS Lead Generation Services",
  description:
    "Build targeted SaaS prospect lists with company research, decision-maker discovery, contact enrichment, and verified CRM-ready data. SaaS lead generation services for sales teams.",
  path: "/industries/saas",
});

export default function SaasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
