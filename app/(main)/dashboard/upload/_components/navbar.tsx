"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const isUpload = pathname === "/dashboard/upload";

  return (
    <div className="sticky top-16 z-50 w-full border-y border-border bg-background/70 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-8 shrink-0 px-2 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Go back</span>
              </Button>

              <div className="hidden h-5 w-px bg-border sm:block" />

              <div className="min-w-0 overflow-x-auto">
                <Breadcrumb>
                  <BreadcrumbList className="flex-nowrap whitespace-nowrap">
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    {isUpload && (
                      <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Upload Documents</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              Upload Documents
            </h1>
            <p className="text-sm text-muted-foreground">
              Store and manage your CVs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
