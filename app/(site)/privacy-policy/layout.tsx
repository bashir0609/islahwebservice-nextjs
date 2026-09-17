import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Islah Web Service collects, uses, and protects personal information submitted through contact, sample request, and consultation website forms.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
