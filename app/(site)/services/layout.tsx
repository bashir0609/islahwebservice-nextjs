import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verified B2B Contact Lists | Islah Web Service",
  description:
    "Custom-built contact lists sourced from Google Maps and business websites, with ICP research and first-party enrichment for your exact target market.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
