import type { Metadata } from "next";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "Ascendio | Job Details Dashboard",
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
      <Footer />
    </div>
  );
}
