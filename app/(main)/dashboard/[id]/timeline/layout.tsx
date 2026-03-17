import type { Metadata } from "next";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Ascendio | Job Application Timeline",
  description: "Detailed timeline of job applications",
};

export default function TimelineLayout({
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
