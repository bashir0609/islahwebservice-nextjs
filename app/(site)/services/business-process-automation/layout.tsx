import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Process Automation",
  description:
    "Automate repetitive workflows, reduce manual effort by 80%, and improve accuracy with custom business process automation solutions.",
};

export default function AutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
