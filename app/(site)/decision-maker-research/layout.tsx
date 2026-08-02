import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Decision Maker Research Service",
  description:
    "Decision maker research service: identify the operations managers, IT directors, sales directors, owners, and marketing managers who actually make buying decisions—by name and role.",
  path: "/decision-maker-research",
});

export default function DecisionMakerResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
