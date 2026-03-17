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
import { ChevronLeft, FileText } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const isUpload = pathname === "/dashboard/upload";

  return (
    <div className="sticky top-16 z-50 w-full backdrop-blur-lg bg-background/60 border border-border">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center justify-center">
            <Button
              className="flex gap-1 items-center justify-center"
              variant={"link"}
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
              Go Back One Step
            </Button>
            <div className="w-px border border-border h-8 mx-2" />

            <Breadcrumb>
              <BreadcrumbList>
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
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <FileText className="h-7 w-7 text-primary" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Upload Documents
              </h1>
              <p className="text-sm text-muted-foreground">
                Store and manage your CVs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
