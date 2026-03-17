"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Decision, decisionConfig } from "@/config/decision-panel-decision";
import { IOfferData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Brain, CheckCircle2, MessageSquare, XCircle } from "lucide-react";

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
