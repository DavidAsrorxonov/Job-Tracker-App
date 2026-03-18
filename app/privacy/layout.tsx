import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ascendio | Privacy Policy",
  description: "Privacy Policy for Ascendio",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
