import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ascendio | Terms and Conditions",
  description: "Terms and Conditions for Ascendio",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
