import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Tracker | Upload Documents",
  description: "Upload documents for job applications",
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
