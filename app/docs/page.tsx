import Link from "next/link";
import { BookOpen, Code2, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TECHNICAL_PAGES, USER_GUIDE_PAGES } from "@/constants/docs-pages";

const DocsPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <Badge
          variant="outline"
          className="w-fit rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          v1.0
        </Badge>

        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
          Ascendio Documentation
        </h1>

        <p className="max-w-xl text-base font-light leading-relaxed text-muted-foreground">
          Everything you need to use Ascendio effectively — from adding your
          first job to understanding how it's built under the hood.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/docs/user-guide/getting-started"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <BookOpen className="h-4 w-4" />
            Get started
          </Link>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-4 py-2 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
          >
            <Code2 className="h-4 w-4" />
            Technical reference
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground/60" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            User Guide
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {USER_GUIDE_PAGES.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {page.label}
                  </p>
                  <p className="text-xs font-light leading-relaxed text-muted-foreground">
                    {page.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 opacity-50 pointer-events-none">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-muted-foreground/60" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Technical Reference
          </h2>
          <Badge variant="secondary" className="text-xs h-5">
            <Lock className="h-3 w-3 mr-1" />
            Under construction 🚧
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TECHNICAL_PAGES.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.href}
                href={page.href}
                className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-muted/80">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {page.label}
                  </p>
                  <p className="text-xs font-light leading-relaxed text-muted-foreground">
                    {page.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 px-5 py-4">
        <p className="text-xs leading-relaxed text-muted-foreground/70">
          Found an issue or something unclear?{" "}
          <a
            href="mailto:asrorxonovdovudxon@gmail.com"
            className="text-primary hover:underline"
          >
            Let me know
          </a>{" "}
          and I'll fix it.
        </p>
      </div>
    </div>
  );
};

export default DocsPage;
