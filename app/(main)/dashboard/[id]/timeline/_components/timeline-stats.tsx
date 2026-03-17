import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ITimelineEntry } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import { Activity, Bell, CalendarDays, GitBranch } from "lucide-react";

const TimelineStats = ({
  job,
  timeline,
}: {
  job: any;
  timeline: ITimelineEntry[];
}) => {
  const stats = [
    {
      icon: Activity,
      label: "Total Events",
      value: timeline.length,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: GitBranch,
      label: "Stage Changes",
      value: timeline.filter((e) => e.type === "status_change").length,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: CalendarDays,
      label: "Interviews",
      value: timeline.filter((e) => e.type === "interview").length,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Bell,
      label: "Follow-ups",
      value: timeline.filter((e) => e.type === "follow_up").length,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const appliedDate = job.data.appliedData?.appliedDate
    ? new Date(job.data.appliedData.appliedDate)
    : null;

  const daysSinceApplied = appliedDate
    ? differenceInDays(new Date(), appliedDate)
    : null;

  return (
    <aside className="lg:col-span-2 h-full min-h-0">
      <div className="h-full space-y-4">
        <Card className="relative overflow-hidden p-6 backdrop-blur-xl md:p-8">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />

          <CardHeader className="relative space-y-4">
            <Badge
              variant="outline"
              className="w-fit rounded-full border-border/50 bg-background/70 px-3 py-1.5 text-xs font-semibold font-mono uppercase tracking-[0.18em] text-muted-foreground"
            >
              <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
              Activity Timeline
            </Badge>

            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight md:text-3xl">
                {job.data.position}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground md:text-base">
                {job.data.company}
              </CardDescription>

              {appliedDate && (
                <p className="text-sm text-muted-foreground/80">
                  Applied on {format(appliedDate, "MMM d, yyyy")}
                  {daysSinceApplied !== null &&
                    ` · ${daysSinceApplied} days ago`}
                </p>
              )}
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ icon: Icon, label, value, color, bg }) => (
            <Card
              key={label}
              className="relative overflow-hidden p-4 backdrop-blur-sm"
            >
              <div
                className={cn(
                  "absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl opacity-40",
                  bg,
                )}
              />

              <CardContent className="relative">
                <div
                  className={cn(
                    "mb-3 flex h-9 w-9 items-center justify-center rounded-xl",
                    bg,
                  )}
                >
                  <Icon className={cn("h-4 w-4", color)} />
                </div>

                <p className="text-2xl font-bold tracking-tight">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TimelineStats;
