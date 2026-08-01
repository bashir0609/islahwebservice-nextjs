import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Lead Generation Analysis",
  description:
    "AI-driven lead generation analysis to identify high-value prospects, increase conversions, and shorten sales cycles with intent signals.",
  path: "/services/lead-generation-analysis",
});

export default function LeadGenerationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
