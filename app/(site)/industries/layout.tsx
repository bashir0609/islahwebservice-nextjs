import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Serve",
  description:
    "B2B lead generation for Managed Service Providers, SaaS companies, recruitment firms, and professional services. Verified prospect lists built for your target industry.",
  path: "/industries",
});

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
