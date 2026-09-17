import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SaaS Prospect Research Services",
  description:
    "Build a SaaS prospect database through custom company research against your ICP, with relevant roles, verified contact details, and CRM-ready records.",
  path: "/industries/saas",
});

export default function SaasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
