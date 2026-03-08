"use client";

import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IInterviewData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Brain,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  HelpCircle,
  Phone,
  Trophy,
  UserCheck,
  XCircle,
} from "lucide-react";

type SingleInterview = IInterviewData["interviews"][number];

const typeConfig: Record<
  SingleInterview["type"],
  { label: string; icon: React.ElementType }
> = {
  phone_screen: { label: "Phone Screen", icon: Phone },
  technical: { label: "Technical", icon: Code2 },
  behavioral: { label: "Behavioral", icon: Brain },
  hiring_manager: { label: "Hiring Manager", icon: UserCheck },
  final: { label: "Final Round", icon: Trophy },
  other: { label: "Other", icon: HelpCircle },
};

const outcomeConfig = {
  passed: {
    label: "Passed",
    className: "border-emerald-500/30 text-emerald-600 bg-emerald-500/10",
    icon: CheckCircle2,
  },
  waiting: {
    label: "Waiting",
    className: "border-amber-500/30 text-amber-600 bg-amber-500/10",
    icon: Clock,
  },
  failed: {
    label: "Failed",
    className: "border-destructive/30 text-destructive bg-destructive/10",
    icon: XCircle,
  },
};

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="flex items-center gap-2 w-32 shrink-0 text-muted-foreground">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">{label}</span>
      </div>
      <div className="flex-1 text-foreground">{children}</div>
    </div>
  );
}

function SingleInterviewCollapsible({
  interview,
  index,
}: {
  interview: SingleInterview;
  index: number;
}) {
  const { label, icon: Icon } = typeConfig[interview.type];
  const outcome = interview.outcome ? outcomeConfig[interview.outcome] : null;

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border/50 bg-muted/10 hover:bg-muted/30 transition-colors group">
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold">{index + 1}</span>
            </div>
            <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium">{label}</span>
            {interview.scheduledDate && (
              <span className="text-xs text-muted-foreground">
                · {format(new Date(interview.scheduledDate), "MMM d, yyyy")}
              </span>
            )}
            {outcome && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-normal py-0 gap-1",
                  outcome.className,
                )}
              >
                <outcome.icon className="h-3 w-3" />
                {outcome.label}
              </Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
        </button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}

const InterviewDataDisplay = ({
  interviewData,
}: {
  interviewData?: IInterviewData;
}) => {
  return <div>InterviewDataDisplay</div>;
};

export default InterviewDataDisplay;
