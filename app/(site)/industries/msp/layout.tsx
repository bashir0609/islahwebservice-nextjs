import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MSP Prospect Lists & Lead Research",
  description:
    "Find companies matching your MSP service area, size, and IT criteria through custom human research, with relevant contacts and CRM-ready prospect data.",
  path: "/industries/msp",
});

export default function MspLayout({ children }: { children: React.ReactNode }) {
  return children;
}
