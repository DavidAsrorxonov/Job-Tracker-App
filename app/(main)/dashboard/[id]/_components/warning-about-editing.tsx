import Link from "next/link";
import { Lock } from "lucide-react";

export function WarningAboutEditing() {
  return (
    <div className="mt-3 max-w-md flex items-start gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-2 text-xs sm:text-sm text-muted-foreground">
      <Lock className="mt-0.5 h-4 w-4 shrink-0" />

      <p className="leading-relaxed wrap-break-word">
        Primary job details are managed from the{" "}
        <Link
          href="/dashboard"
          className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
        >
          Dashboard
        </Link>
        .
      </p>
    </div>
  );
}
