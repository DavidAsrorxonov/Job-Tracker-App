import Image from "next/image";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, XCircle } from "lucide-react";
import React from "react";

type CalloutType = "info" | "warning" | "tip" | "danger";

const CALLOUT_STYLES: Record<
  CalloutType,
  { icon: React.ReactNode; className: string }
> = {
  info: {
    icon: <Info className="h-4 w-4 shrink-0 text-blue-500" />,
    className:
      "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-500" />,
    className:
      "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/40",
  },
  tip: {
    icon: <Lightbulb className="h-4 w-4 shrink-0 text-green-500" />,
    className:
      "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40",
  },
  danger: {
    icon: <XCircle className="h-4 w-4 shrink-0 text-red-500" />,
    className:
      "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40",
  },
};

export const Callout = ({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) => {
  const { icon, className } = CALLOUT_STYLES[type];

  return (
    <div className={cn("my-5 flex gap-3 rounded-lg border p-4", className)}>
      <span className="mt-0.5">{icon}</span>
      <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
};

export const Steps = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 flex flex-col gap-0 [counter-reset:step]">
    {children}
  </div>
);

export const Step = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="relative flex gap-4 pb-8 [counter-increment:step] last:pb-0">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
        <span
          className="[content:counter(step)]"
          style={{ content: "counter(step)" }}
        />
      </div>
      <div className="mt-2 w-px flex-1 bg-border last:hidden" />
    </div>
    <div className="flex-1 pb-2">
      <p className="mb-2 font-semibold text-foreground leading-8">{title}</p>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const ImageCaption = ({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) => (
  <figure className="my-6">
    <div className="overflow-hidden rounded-xl border border-border/60 shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <div className="mx-auto flex h-5 w-40 items-center justify-center rounded bg-background/60 px-2">
          <span className="text-[10px] text-muted-foreground/50 tracking-wide">
            ascendio.app
          </span>
        </div>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full"
      />
    </div>
    {caption && (
      <figcaption className="mt-2.5 text-center text-xs text-muted-foreground">
        {caption}
      </figcaption>
    )}
  </figure>
);

export const CodeBlock = ({
  children,
  filename,
  language,
}: {
  children: string;
  filename?: string;
  language?: string;
}) => (
  <div className="my-5 overflow-hidden rounded-lg border border-border/60">
    {filename && (
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/60 px-4 py-2">
        <span className="text-xs text-muted-foreground">{filename}</span>
        {language && (
          <span className="ml-auto text-xs text-muted-foreground/50 uppercase tracking-widest">
            {language}
          </span>
        )}
      </div>
    )}
    <pre className="overflow-x-auto bg-muted/30 p-4 text-sm leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  </div>
);

export const DocCard = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) => {
  const inner = (
    <div className="rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5">
      <p className="mb-1 font-medium text-foreground text-sm">{title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {inner}
      </a>
    );
  }

  return inner;
};

export const DocCardGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
);
