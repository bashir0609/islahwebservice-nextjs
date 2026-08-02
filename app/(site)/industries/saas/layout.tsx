import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lead Generation for SaaS Companies",
  description:
    "B2B lead generation for SaaS companies. Build ICP-qualified prospect lists with verified decision-maker contacts to fill your pipeline and shorten sales cycles.",
  path: "/industries/saas",
});

export default function SaasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
