import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Business Process Automation",
  description:
    "Automate repetitive workflows, reduce manual effort by 80%, and improve accuracy with custom business process automation solutions.",
  path: "/services/business-process-automation",
});

export default function AutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
