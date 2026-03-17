import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ascendio | Dashboard",
  description: "Dashboard for job applications",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
