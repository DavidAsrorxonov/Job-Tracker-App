"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { IRejectedData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  AlertCircle,
  CalendarDays,
  FileText,
  MessageSquare,
} from "lucide-react";

type RejectedPanelProps = {
  data: IRejectedData;
  updateData: (updater: (p: IRejectedData) => IRejectedData) => void;
};

const stageConfig: Record<
  IRejectedData["rejectionStage"],
  { label: string; description: string }
> = {
  before_apply: {
    label: "Before Apply",
    description: "Decided not to apply after research",
  },
  after_apply: {
    label: "After Apply",
    description: "Rejected after submitting application",
  },
  after_screen: {
    label: "After Screen",
    description: "Rejected after phone/initial screen",
  },
  after_interview: {
    label: "After Interview",
    description: "Rejected after one or more interviews",
  },
  after_offer: {
    label: "After Offer",
    description: "Offer was rescinded",
  },
};

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </div>
      {children}
    </div>
  );
}

const RejectionOverviewPanel = ({ data, updateData }: RejectedPanelProps) => {
  const currentStage = data.rejectionStage
    ? stageConfig[data.rejectionStage]
    : null;

  return (
    <Card className="w-full shadow-sm border-border/60">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight">
              Rejection Overview
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              When, where and why it didn't work out.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {currentStage && (
              <Badge
                variant="outline"
                className="text-xs font-normal text-muted-foreground"
              >
                {currentStage.label}
              </Badge>
            )}
            {data.rejectedDate && (
              <Badge
                variant="outline"
                className="text-xs font-normal gap-1 text-muted-foreground"
              >
                <CalendarDays className="h-3 w-3" />
                {format(new Date(data.rejectedDate), "MMM d, yyyy")}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-5">
        <Section icon={AlertCircle} title="Rejection Stage">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {(
              Object.entries(stageConfig) as [
                IRejectedData["rejectionStage"],
                (typeof stageConfig)[IRejectedData["rejectionStage"]],
              ][]
            ).map(([key, { label, description }]) => {
              const isSelected = data.rejectionStage === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    updateData((p) => ({ ...p, rejectionStage: key }))
                  }
                  className={cn(
                    "flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-all duration-200",
                    isSelected
                      ? "border-destructive/40 bg-destructive/10 text-destructive ring-2 ring-destructive/20 ring-offset-1 ring-offset-background"
                      : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40",
                  )}
                >
                  <span className="text-xs font-semibold">{label}</span>
                  <span
                    className={cn(
                      "text-xs",
                      isSelected
                        ? "text-destructive/70"
                        : "text-muted-foreground/70",
                    )}
                  >
                    {description}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        <Separator />

        <Section icon={CalendarDays} title="Rejection Date">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-fit justify-start text-sm font-normal",
                  !data.rejectedDate && "text-muted-foreground",
                )}
              >
                <CalendarDays className="mr-2 h-3.5 w-3.5 shrink-0" />
                {data.rejectedDate
                  ? format(new Date(data.rejectedDate), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  data.rejectedDate ? new Date(data.rejectedDate) : undefined
                }
                onSelect={(d) =>
                  updateData((p) => ({ ...p, rejectedDate: d ?? undefined }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </Section>

        <Separator />

        <Section icon={FileText} title="Rejection Reason">
          <Textarea
            value={data.rejectionReason ?? ""}
            onChange={(e) =>
              updateData((p) => ({ ...p, rejectionReason: e.target.value }))
            }
            placeholder="What reason did they give? e.g. Went with a more experienced candidate..."
            className="min-h-20 text-sm resize-none"
          />
        </Section>

        <Separator />

        <Section icon={MessageSquare} title="Feedback">
          <Textarea
            value={data.feedback ?? ""}
            onChange={(e) =>
              updateData((p) => ({ ...p, feedback: e.target.value }))
            }
            placeholder="Any feedback received from the recruiter or interviewer..."
            className="min-h-20 text-sm resize-none"
          />
        </Section>
      </CardContent>
    </Card>
  );
};

export default RejectionOverviewPanel;
