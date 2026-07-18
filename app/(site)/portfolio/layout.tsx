import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Islah Web Service case studies and success stories in B2B contact lists, lead generation, and process automation.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
