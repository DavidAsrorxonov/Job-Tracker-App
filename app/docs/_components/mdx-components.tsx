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
