"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DOCS_NAV } from "@/constants/docs-nav";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DocsSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border/60">
      <div className="flex h-full flex-col gap-6 px-4 py-6">
        <Button
          variant={"ghost"}
          asChild
          size={"sm"}
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground -ml-1"
        >
          <Link href={"/dashboard"}>
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>
        </Button>

        {DOCS_NAV.map((section) => (
          <div key={section.section} className="flex flex-col gap-1">
            <div className="mb-1 flex items-center gap-2 px-2">
              <span className="text-muted-foreground/60">{section.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {section.section}
              </span>
            </div>

            {section.pages.map((page) => {
              const isActive = pathname === page.href;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={cn(
                    "group relative flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-150",
                    isActive
                      ? "bg-primary/8 text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                  )}
                  {page.label}
                </Link>
              );
            })}
          </div>
        ))}

        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-muted-foreground/60">Version</span>
            <Badge variant="secondary" className="text-xs rounded-full">
              v1.0
            </Badge>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DocsSidebar;
