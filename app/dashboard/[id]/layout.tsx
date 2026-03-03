import type { Metadata } from "next";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Job Tracker | Job Details Dashboard",
  description: "Job details dashboard for job applications",
};

export default function JobDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
