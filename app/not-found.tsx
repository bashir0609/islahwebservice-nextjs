import type { Metadata } from "next";
import NotFoundContent from "@/components/site/not-found-content";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Islah Web Service" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
