import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research Services & Capabilities",
  description:
    "Compare custom prospect research and existing database enrichment to choose the right service for finding new contacts or completing your CRM records.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
