import Image from "next/image";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, Lightbulb, XCircle } from "lucide-react";

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
