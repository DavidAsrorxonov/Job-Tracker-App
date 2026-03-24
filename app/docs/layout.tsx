import type { Metadata } from "next";
import DocsTopbar from "./_components/docs-topbar";
import DocsSidebar from "./_components/docs-sidebar";
import DocsToc from "./_components/docs-toc";

export const metadata: Metadata = {
  title: {
    template: "%s | Ascendio Docs",
    default: "Ascendio Documentation",
  },
  description: "Learn how to use Ascendio to manage your job search.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DocsTopbar />

      <div className="flex flex-1">
        <DocsSidebar />

        <div className="flex flex-1 justify-center">
          <div className="flex w-full max-w-5xl gap-12 px-8 py-10">
            <main className="flex-1 min-w-0">{children}</main>

            <aside className="hidden xl:block w-48 shrink-0">
              <div className="sticky top-24">
                <DocsToc />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
