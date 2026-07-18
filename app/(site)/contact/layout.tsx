import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Islah Web Service for verified B2B contact lists, lead generation analysis, and business process automation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
