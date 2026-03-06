"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="sticky z-50 bottom-0 backdrop-blur-md bg-background/60 border-t border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 Job Tracker</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Button
              variant="link"
              className="h-auto p-0 text-muted-foreground text-sm"
              asChild
            >
              <a href="#">Privacy Policy</a>
            </Button>
            <Button
              variant="link"
              className="h-auto p-0 text-muted-foreground text-sm"
              asChild
            >
              <a href="#">Terms of Service</a>
            </Button>
            <span className="inline-flex items-center gap-2">
              Crafted by
              <Link href={"https://github.com/DavidAsrorxonov"} target="_blank">
                @David
              </Link>
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
