import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Tracker | Dashboard",
  description: "Dashboard for job applications",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
