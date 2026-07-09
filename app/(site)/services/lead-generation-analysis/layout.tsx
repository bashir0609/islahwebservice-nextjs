import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Generation Analysis | Islah Web Service",
  description:
    "AI-driven lead generation analysis to identify high-value prospects, increase conversions, and shorten sales cycles with intent signals.",
};

export default function LeadGenerationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
