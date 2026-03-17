"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleForward = () => {
    router.forward();
  };

  return (
    <nav className="sticky top-16 z-50 w-full px-6 py-2 flex items-center justify-between backdrop-blur-lg bg-background/60 border border-border">
      <Button variant="outline" onClick={handleBack}>
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </Button>

      <div className="flex items-center justify-center gap-2 flex-1">
        <h1 className="font-bold text-xl">Job Workshop Dashboard</h1>
      </div>

      <Button variant={"outline"} onClick={handleForward}>
        Forward
        <ArrowRight className="h-5 w-5 mr-2" />
      </Button>
    </nav>
  );
};

export default Navbar;
