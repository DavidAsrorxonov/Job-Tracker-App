import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { typeConfig } from "@/config/timeline-feed";
import { ITimelineEntry } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { Clock3 } from "lucide-react";

export default function EntryCard({
  entry,
  isLast,
}: {
  entry: ITimelineEntry;
  isLast: boolean;
}) {
  const config = typeConfig[entry.type];
  const Icon = config.icon;
  const date = new Date(entry.date);

  return (
    <div className="relative pl-16 group">
      {!isLast && (
        <div className="absolute left-6 top-10 -bottom-6 w-px bg-linear-to-b from-border via-border/50 to-transparent" />
      )}

      <div className="absolute left-[0.92rem] top-5">
        <div
          className={cn(
            "relative flex h-5 w-5 items-center justify-center rounded-full border-4 border-background transition-transform duration-300 group-hover:scale-110",
            config.dot,
            config.glow,
          )}
        >
          <div className="absolute h-2 w-2 rounded-full bg-white/80" />
        </div>
      </div>

      <div className="absolute left-8 top-[1.7rem] h-px w-6 bg-linear-to-r from-border to-transparent" />

      <Card className="relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-1 bg-linear-to-b",
            config.accentLine,
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-linear-to-br opacity-70",
            config.softBg,
          )}
        />

        <CardContent className="relative px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border/50 bg-background/70">
                  <Icon className="h-4 w-4 text-foreground/80" />
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "h-6 rounded-full px-2.5 text-[11px]",
                    config.badgeClass,
                  )}
                >
                  {config.label}
                </Badge>

                {entry.automated && (
                  <Badge
                    variant="outline"
                    className="h-6 rounded-full border-muted-foreground/20 bg-muted/40 px-2.5 text-[11px] text-muted-foreground"
                  >
                    automated
                  </Badge>
                )}
              </div>

              <h3 className="text-sm font-semibold leading-6 text-foreground">
                {entry.action}
              </h3>

              {entry.description && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {entry.description}
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-right">
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="tabular-nums">{format(date, "h:mm a")}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                {formatDistanceToNow(date, { addSuffix: true })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
