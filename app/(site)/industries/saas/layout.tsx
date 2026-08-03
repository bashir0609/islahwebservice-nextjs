import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lead Generation for SaaS Companies",
  description:
    "B2B prospect research for SaaS companies: ICP-matched prospect lists with verified decision-maker contacts, built for software sales teams targeting buyers by stack, size, and budget.",
  path: "/industries/saas",
});

export default function SaasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
