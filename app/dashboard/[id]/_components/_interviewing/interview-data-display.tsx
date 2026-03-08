"use client";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IInterviewData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  HelpCircle,
  MessageSquare,
  NotebookPen,
  Phone,
  Timer,
  Trophy,
  User,
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

      <CollapsibleContent>
        <div className="mt-2 ml-3 pl-3 border-l border-border/50 space-y-3 py-2">
          {interview.interviewer && (
            <Row icon={User} label="Interviewer">
              <span className="text-sm">{interview.interviewer}</span>
            </Row>
          )}
          {interview.scheduledDate && (
            <Row icon={CalendarDays} label="Scheduled">
              <span className="text-sm">
                {format(new Date(interview.scheduledDate), "PPP")}
              </span>
            </Row>
          )}
          {interview.completedDate && (
            <Row icon={CheckCircle2} label="Completed">
              <span className="text-sm">
                {format(new Date(interview.completedDate), "PPP")}
              </span>
            </Row>
          )}
          {interview.duration && (
            <Row icon={Timer} label="Duration">
              <span className="text-sm">{interview.duration} min</span>
            </Row>
          )}
          {interview.rating && (
            <Row icon={Trophy} label="Rating">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      i < (interview.rating ?? 0)
                        ? "bg-primary"
                        : "bg-muted-foreground/20",
                    )}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {interview.rating}/5
                </span>
              </div>
            </Row>
          )}
          {interview.questionsAsked && interview.questionsAsked.length > 0 && (
            <Row icon={HelpCircle} label="Questions">
              <ul className="space-y-1">
                {interview.questionsAsked.map((q, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground/80 flex items-start gap-1.5"
                  >
                    <span className="text-muted-foreground shrink-0">·</span>
                    {q}
                  </li>
                ))}
              </ul>
            </Row>
          )}
          {interview.notes?.trim() && (
            <Row icon={MessageSquare} label="Notes">
              <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                {interview.notes}
              </p>
            </Row>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const InterviewDataDisplay = ({
  interviewData,
}: {
  interviewData?: IInterviewData;
}) => {
  if (!interviewData) return null;

  const hasGlobalData =
    interviewData.prepNotes ||
    interviewData.questionsToAsk?.length ||
    interviewData.technicalTopics?.length ||
    interviewData.nextSteps;

  const hasInterviews = interviewData.interviews?.length > 0;
  const hasAnyData = hasGlobalData || hasInterviews;

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors group">
          <div className="flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Interview Notes</span>
            {hasInterviews && (
              <Badge variant="secondary" className="text-xs font-normal py-0">
                {interviewData.interviews.length} interview
                {interviewData.interviews.length > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-2">
        {!hasAnyData ? (
          <div className="px-4 py-8 flex flex-col items-center justify-center text-center gap-2 rounded-lg border border-dashed border-border/60">
            <NotebookPen
              className="h-10 w-10 text-muted-foreground/20"
              strokeWidth={1}
            />
            <p className="text-sm text-muted-foreground">
              No interview notes recorded.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-border/60 bg-muted/10 divide-y divide-border/50">
            {hasGlobalData && (
              <div className="px-4 py-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Prep Notes
                </p>
                {interviewData.prepNotes && (
                  <Row icon={BookOpen} label="Notes">
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                      {interviewData.prepNotes}
                    </p>
                  </Row>
                )}
                {interviewData.questionsToAsk?.length ? (
                  <Row icon={HelpCircle} label="Questions">
                    <ul className="space-y-1">
                      {interviewData.questionsToAsk.map((q, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground/80 flex items-start gap-1.5"
                        >
                          <span className="text-muted-foreground shrink-0">
                            ·
                          </span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </Row>
                ) : null}
                {interviewData.technicalTopics?.length ? (
                  <Row icon={Code2} label="Topics">
                    <div className="flex flex-wrap gap-1.5">
                      {interviewData.technicalTopics.map((t, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </Row>
                ) : null}
                {interviewData.nextSteps && (
                  <Row icon={ArrowRight} label="Next Steps">
                    <p className="text-sm text-foreground/80">
                      {interviewData.nextSteps}
                    </p>
                  </Row>
                )}
              </div>
            )}

            {hasInterviews && (
              <div className="px-4 py-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Interviews
                </p>
                {interviewData.interviews.map((interview, index) => (
                  <SingleInterviewCollapsible
                    key={interview._id?.toString() ?? index}
                    interview={interview}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default InterviewDataDisplay;
