"use client";

import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Search } from "lucide-react";
import Link from "next/link";

const DocsTopbar = () => {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="flex h-full items-center gap-4 px-6">
        <Link href="/docs" className="flex items-center gap-2.5 shrink-0">
          <Logo width={60} height={60} />
          <Badge
            variant="secondary"
            className="rounded-full text-xs font-medium"
          >
            Docs
          </Badge>
        </Link>

        <Separator orientation="vertical" className="h-2" />

        <button
          type="button"
          className="flex flex-1 max-w-sm items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:border-border"
          aria-label="Search documentation"
          onClick={() => {
            // Implement algolia search later
          }}
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left text-xs">
            Search documentation...
          </span>
          <KbdGroup>
            <Kbd>⌘ K</Kbd>
          </KbdGroup>
        </button>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <Badge
            variant="outline"
            className="rounded-full text-xs hidden sm:flex"
          >
            v1.0
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:flex text-muted-foreground hover:text-foreground gap-1.5"
          >
            <Link
              href="https://github.com/DavidAsrorxonov"
              target="_blank"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden md:flex text-muted-foreground hover:text-foreground"
          >
            <Link href="/dashboard">Open app</Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default DocsTopbar;
