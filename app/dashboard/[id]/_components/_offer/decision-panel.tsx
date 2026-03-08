"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOfferData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Brain, CheckCircle2, MessageSquare, XCircle } from "lucide-react";

type Decision = NonNullable<IOfferData["decision"]>;

const decisionConfig: Record<
  Decision,
  {
    label: string;
    icon: React.ElementType;
    className: string;
    badgeClassName: string;
  }
> = {
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 data-[selected=true]:ring-2 data-[selected=true]:ring-emerald-500/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-emerald-500/30 text-emerald-600 bg-emerald-500/10",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 data-[selected=true]:ring-2 data-[selected=true]:ring-destructive/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-destructive/30 text-destructive bg-destructive/10",
  },
  negotiating: {
    label: "Negotiating",
    icon: MessageSquare,
    className:
      "border-amber-500/40 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 data-[selected=true]:ring-2 data-[selected=true]:ring-amber-500/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-amber-500/30 text-amber-600 bg-amber-500/10",
  },
  considering: {
    label: "Considering",
    icon: Brain,
    className:
      "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 data-[selected=true]:ring-2 data-[selected=true]:ring-primary/50 data-[selected=true]:ring-offset-2 data-[selected=true]:ring-offset-background",
    badgeClassName: "border-primary/30 text-primary bg-primary/10",
  },
};

type OfferPanelProps = {
  data: IOfferData;
  updateData: (updater: (p: IOfferData) => IOfferData) => void;
};

const DecisionPanel = ({ data, updateData }: OfferPanelProps) => {
  const currentDecision = data.decision ? decisionConfig[data.decision] : null;

  return (
    <Card className="w-full shadow-sm border-border/60">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight">
              Decision
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              What's your current status on this offer?
            </p>
          </div>

          {data.decision && currentDecision && (
            <Badge
              variant={"outline"}
              className={cn(
                "text-xs font-normal gap-1.5",
                currentDecision.badgeClassName,
              )}
            >
              <currentDecision.icon className="h-3 w-3" />
              {currentDecision.label}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(
            Object.entries(decisionConfig) as [
              Decision,
              (typeof decisionConfig)[Decision],
            ][]
          ).map(([key, { label, icon: Icon, className }]) => {
            const isSelected = data.decision === key;
            return (
              <button
                key={key}
                type="button"
                data-selected={isSelected}
                onClick={() =>
                  updateData((p) => ({
                    ...p,
                    decision: isSelected ? undefined : key,
                    decisionDate: isSelected ? undefined : new Date(),
                  }))
                }
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-lg border px-4 py-4 text-sm font-medium transition-all duration-200 cursor-pointer",
                  isSelected
                    ? className
                    : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            );
          })}
        </div>

        {data.decision && data.decisionDate && (
          <p className="text-xs text-muted-foreground">
            Marked as{" "}
            <span className="font-medium text-foreground">
              {decisionConfig[data.decision].label}
            </span>{" "}
            on{" "}
            <span className="font-medium text-foreground">
              {format(new Date(data.decisionDate), "MMM d, yyyy")}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DecisionPanel;
