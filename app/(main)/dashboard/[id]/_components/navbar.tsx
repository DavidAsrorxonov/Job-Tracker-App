"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-16 z-50 w-full border border-border bg-background/60 backdrop-blur-lg">
      <div className="flex items-center justify-between px-3 py-2 sm:px-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-1 justify-center px-2">
          <h1 className="truncate text-sm font-semibold sm:text-base md:text-lg">
            Job Workshop Dashboard
          </h1>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => router.forward()}
          className="shrink-0"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
