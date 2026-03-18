import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SpotlightFooter from "@/components/effects/spotlight-footer";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
              Ascendio
            </span>

            <nav className="flex flex-wrap justify-center gap-1">
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="sm"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>

            <Button size="sm" className="rounded-full px-5 text-sm" asChild>
              <Link href="/sign-in">
                Get started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden py-12 lg:py-16">
        <div className="w-full px-4">
          <h2
            className="
              select-none text-center font-extrabold uppercase
              leading-none tracking-widest text-primary
              whitespace-nowrap
              text-[clamp(2.5rem,12vw,10rem)]
            "
          >
            ASCENDIO
          </h2>
        </div>
        <SpotlightFooter
          className="pointer-events-none absolute bottom-0 left-0 h-full w-full"
          fill="#22c55e"
        />
      </div>

      <Separator />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Ascendio</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Button
              variant="link"
              className="h-auto p-0 text-sm text-muted-foreground"
              asChild
            >
              <a href="#">Privacy Policy</a>
            </Button>
            <Button
              variant="link"
              className="h-auto p-0 text-sm text-muted-foreground"
              asChild
            >
              <a href="#">Terms of Service</a>
            </Button>
            <span className="inline-flex items-center gap-1.5">
              Crafted by
              <Link
                href="https://github.com/DavidAsrorxonov"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
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
