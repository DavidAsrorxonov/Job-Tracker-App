import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IInterviewData } from "@/lib/models/job-application";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Code2,
  HelpCircle,
  Phone,
  Trophy,
  User,
  UserCheck,
} from "lucide-react";
import RatingDots from "./_components/rating-dots";

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
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  waiting: {
    label: "Waiting",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const InterviewCard = ({
  interviewData,
  onClick,
}: {
  interviewData: SingleInterview;
  onClick: () => void;
}) => {
  const { label, icon: Icon } = typeConfig[interviewData.type];
  const outcome = interviewData.outcome
    ? outcomeConfig[interviewData.outcome]
    : null;
  const isUpcoming =
    interviewData.scheduledDate && !interviewData.completedDate;

  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-border group",
        isUpcoming && "border-primary/30 bg-primary/2",
      )}
    >
      <CardContent className="px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={cn(
                "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                isUpcoming
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold">{label}</p>
                {outcome && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-normal py-0",
                      outcome.className,
                    )}
                  >
                    {outcome.label}
                  </Badge>
                )}
                {isUpcoming && (
                  <Badge
                    variant="outline"
                    className="text-xs font-normal py-0 border-primary/30 text-primary bg-primary/5"
                  >
                    Upcoming
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {interviewData.scheduledDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(
                      new Date(interviewData.scheduledDate),
                      "MMM d, yyyy",
                    )}
                  </span>
                )}
                {interviewData.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {interviewData.duration} min
                  </span>
                )}
                {interviewData.interviewer && (
                  <span className="flex items-center gap-1 truncate max-w-40">
                    <User className="h-3 w-3 shrink-0" />
                    <span className="truncate">
                      {interviewData.interviewer}
                    </span>
                  </span>
                )}
              </div>

              {interviewData.notes?.trim() && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {interviewData.notes}
                </p>
              )}

              <RatingDots rating={interviewData.rating} />
            </div>
          </div>

          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 mt-1 transition-transform group-hover:translate-x-0.5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
