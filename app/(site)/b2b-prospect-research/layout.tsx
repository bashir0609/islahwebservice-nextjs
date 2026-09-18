import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Prospect Research for Custom Lists",
  description:
    "Get B2B lead generation through custom human research against your ICP, with target companies, requested decision-makers, and CRM-ready contact data.",
  path: "/b2b-prospect-research",
});

export default function B2BProspectResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
