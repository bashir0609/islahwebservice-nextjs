import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prospect List Building Service",
  description:
    "Targeted prospect list building service: researched, filtered, and qualified prospect databases built around your ICP with verified contact data for outbound campaigns.",
  path: "/prospect-list-building",
});

export default function ProspectListBuildingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
