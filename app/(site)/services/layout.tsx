import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "B2B Research & Data Capabilities",
  description:
    "Explore Islah Web Service's B2B research and data capabilities: prospect research, decision-maker discovery, contact enrichment, email verification, and CRM-ready data delivery for B2B sales teams.",
  path: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
