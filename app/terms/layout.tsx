import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ascendio | Terms of Service",
  description: "Terms of Service for Ascendio",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
