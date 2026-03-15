"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, ChevronRight, Clock, Trash2, User } from "lucide-react";
import RatingDots from "./_components/rating-dots";
import { useState } from "react";
import { deleteInterview } from "@/lib/actions/interviewing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  outcomeConfig,
  SingleInterview,
  typeConfig,
} from "@/config/interview-card-type";

const InterviewCard = ({
  interviewData,
  jobId,
  onClick,
}: {
  interviewData: SingleInterview;
  jobId: string;
  onClick: () => void;
}) => {
  const [deleting, setDeleting] = useState(false);
  const { label, icon: Icon } = typeConfig[interviewData.type];
  const outcome = interviewData.outcome
    ? outcomeConfig[interviewData.outcome]
    : null;
  const isUpcoming =
    interviewData.scheduledDate && !interviewData.completedDate;

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      setDeleting(true);
      await deleteInterview(jobId, interviewData._id!.toString());
      toast.success("Interview deleted", {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to delete", {
        duration: 2000,
        position: "top-center",
      });
      console.error(error);
    } finally {
      setDeleting(false);
    }
  }

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

          <div className="flex items-center gap-1 mt-0.5 shrink-0">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground/40 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
