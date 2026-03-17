"use client";

import { IRejectedData } from "@/lib/models/job-application";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarDays,
  BookOpen,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

type RejectedPanelProps = {
  data: IRejectedData;
  updateData: (updater: (p: IRejectedData) => IRejectedData) => void;
};

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Icon className="h-3.5 w-3.5" />
          {title}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground/70 mt-0.5 ml-5">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

const ReflectionPanel = ({ data, updateData }: RejectedPanelProps) => {
  return (
    <Card className="w-full shadow-sm border-border/60">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold tracking-tight">
            Reflection
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Turn this rejection into a learning opportunity.
          </p>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-5">
        {/* Lessons Learned */}
        <Section
          icon={BookOpen}
          title="Lessons Learned"
          description="What would you do differently next time?"
        >
          <Textarea
            value={data.lessonsLearned ?? ""}
            onChange={(e) =>
              updateData((p) => ({ ...p, lessonsLearned: e.target.value }))
            }
            placeholder="e.g. Should have prepared more for system design questions, need to improve communication of past projects..."
            className="min-h-24 text-sm resize-none"
          />
        </Section>

        <Separator />

        <Section
          icon={RefreshCw}
          title="Would You Reapply?"
          description="Would you consider applying to this company again in the future?"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                updateData((p) => ({
                  ...p,
                  wouldReapply: p.wouldReapply === true ? undefined : true,
                }))
              }
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200",
                data.wouldReapply === true
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 ring-2 ring-emerald-500/20 ring-offset-1 ring-offset-background"
                  : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40",
              )}
            >
              <ThumbsUp className="h-4 w-4" />
              Yes
            </button>
            <button
              type="button"
              onClick={() =>
                updateData((p) => ({
                  ...p,
                  wouldReapply: p.wouldReapply === false ? undefined : false,
                }))
              }
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200",
                data.wouldReapply === false
                  ? "border-destructive/40 bg-destructive/10 text-destructive ring-2 ring-destructive/20 ring-offset-1 ring-offset-background"
                  : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40",
              )}
            >
              <ThumbsDown className="h-4 w-4" />
              No
            </button>
          </div>
        </Section>

        <Separator />

        <Section
          icon={CalendarDays}
          title="Reapply Date"
          description="When would you consider reapplying? Only relevant if you'd reapply."
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={data.wouldReapply === false}
                className={cn(
                  "w-fit justify-start text-sm font-normal",
                  !data.reapplyDate && "text-muted-foreground",
                )}
              >
                <CalendarDays className="mr-2 h-3.5 w-3.5 shrink-0" />
                {data.reapplyDate
                  ? format(new Date(data.reapplyDate), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={
                  data.reapplyDate ? new Date(data.reapplyDate) : undefined
                }
                onSelect={(d) =>
                  updateData((p) => ({ ...p, reapplyDate: d ?? undefined }))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {data.wouldReapply === false && (
            <p className="text-xs text-muted-foreground/60 italic">
              Not applicable — you wouldn't reapply.
            </p>
          )}
        </Section>
      </CardContent>
    </Card>
  );
};

export default ReflectionPanel;
