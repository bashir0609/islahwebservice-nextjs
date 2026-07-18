import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Islah Web Service's mission to deliver verified B2B contacts, lead intelligence, and business automation since 2020.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
