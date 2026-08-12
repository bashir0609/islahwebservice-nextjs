import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MSP Lead Generation Services",
  description:
    "MSP lead generation services built on targeted company research. Research businesses matching your geography, size, industry, and IT-related criteria, with verified decision-maker contacts.",
  path: "/industries/msp",
});

export default function MspLayout({ children }: { children: React.ReactNode }) {
  return children;
}
