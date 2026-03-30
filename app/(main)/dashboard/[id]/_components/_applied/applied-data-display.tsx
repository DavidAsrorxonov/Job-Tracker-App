"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, isBefore, startOfDay } from "date-fns";
import {
  CalendarDays,
  FileText,
  Mail,
  User,
  Clock,
  Bell,
  MessageSquare,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IAppliedData } from "./applied-panel";

function methodLabel(m?: IAppliedData["applicationMethod"]) {
  switch (m) {
    case "linkedin":
      return "LinkedIn";
    case "company_site":
      return "Company Site";
    case "referral":
      return "Referral";
    case "other":
      return "Other";
    default:
      return null;
  }
}

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
    <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-start sm:gap-3">
      <div className="flex items-center gap-2 text-muted-foreground sm:w-36 sm:shrink-0">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">{label}</span>
      </div>
      <div className="min-w-0 flex-1 text-foreground wrap-break-words">
        {children}
      </div>
    </div>
  );
}

const AppliedDataDisplay = ({
  appliedData,
}: {
  appliedData?: IAppliedData;
}) => {
  if (!appliedData)
    return (
      <Card className="w-full border-border/60 shadow-sm opacity-75">
        <CardContent className="flex flex-col items-center justify-center gap-3 px-4 py-10 text-center sm:px-6">
          <CalendarDays
            className="h-12 w-12 text-muted-foreground/20"
            strokeWidth={1}
          />
          <p className="text-sm font-medium text-muted-foreground">
            No applied data
          </p>
          <p className="max-w-48 text-xs text-muted-foreground/60">
            No details were recorded when this job was marked as applied.
          </p>
        </CardContent>
      </Card>
    );

  const today = startOfDay(new Date());
  const followUps = (appliedData.followUpDates ?? []).filter(Boolean);
  const overdueFollowUps = followUps.filter((d) =>
    isBefore(startOfDay(new Date(d)), today),
  );
  const upcomingFollowUps = followUps.filter(
    (d) => !isBefore(startOfDay(new Date(d)), today),
  );

  return (
    <Card className="w-full border-border/60 shadow-sm opacity-90">
      <CardHeader className="border-b border-border/50 bg-muted/20 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight text-muted-foreground sm:text-lg">
              Applied Details
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Recorded when you applied · Read only
            </p>
          </div>

          {appliedData.appliedDate ? (
            <Badge
              variant="outline"
              className="max-w-full gap-1 text-xs font-normal text-muted-foreground whitespace-normal wrap-break-words"
            >
              <CalendarDays className="h-3 w-3 shrink-0" />
              <span>
                {format(new Date(appliedData.appliedDate), "MMM d, yyyy")}
              </span>
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-3.5 px-4 py-5 sm:px-6">
        {/* Method */}
        <Row icon={Mail} label="Method">
          {methodLabel(appliedData.applicationMethod) ? (
            <Badge
              variant="secondary"
              className="max-w-full text-xs font-normal wrap-break-words whitespace-normal"
            >
              {methodLabel(appliedData.applicationMethod)}
            </Badge>
          ) : (
            <span className="text-xs italic text-muted-foreground">
              Not set
            </span>
          )}
        </Row>

        <Separator />

        {/* Resume */}
        <Row icon={FileText} label="Resume">
          {appliedData.resumeVersion ? (
            <span className="text-sm wrap-break-words">
              {appliedData.resumeVersion}
            </span>
          ) : (
            <span className="text-xs italic text-muted-foreground">
              Not set
            </span>
          )}
        </Row>

        <Separator />

        {/* Cover Letter */}
        <Row icon={Mail} label="Cover Letter">
          {appliedData.coverLetterUsed ? (
            <div className="flex flex-wrap items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs">Used</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
              <XCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs">Not used</span>
            </div>
          )}
        </Row>

        {/* Referral */}
        {appliedData.referralContact?.trim() && (
          <>
            <Separator />
            <Row icon={User} label="Referral">
              <span className="text-sm wrap-break-words">
                {appliedData.referralContact}
              </span>
            </Row>
          </>
        )}

        <Separator />

        {/* Expected Response */}
        <Row icon={Clock} label="Expected By">
          {appliedData.expectedResponseDate ? (
            <Badge
              variant="outline"
              className={cn(
                "max-w-full text-xs font-normal whitespace-normal wrap-break-words",
                isBefore(
                  startOfDay(new Date(appliedData.expectedResponseDate)),
                  today,
                )
                  ? "border-destructive/30 bg-destructive/5 text-destructive"
                  : "text-muted-foreground",
              )}
            >
              {format(
                new Date(appliedData.expectedResponseDate),
                "MMM d, yyyy",
              )}
              {isBefore(
                startOfDay(new Date(appliedData.expectedResponseDate)),
                today,
              ) && " · Overdue"}
            </Badge>
          ) : (
            <span className="text-xs italic text-muted-foreground">
              Not set
            </span>
          )}
        </Row>

        <Separator />

        {/* Follow Ups */}
        <Row icon={Bell} label="Follow Ups">
          {followUps.length === 0 ? (
            <span className="text-xs italic text-muted-foreground">
              None added
            </span>
          ) : (
            <div className="space-y-1 wrap-break-word">
              {overdueFollowUps.length > 0 && (
                <p className="text-xs text-destructive/80">
                  {overdueFollowUps.length} overdue
                </p>
              )}
              {upcomingFollowUps.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {upcomingFollowUps.length} upcoming · Next:{" "}
                  <span className="font-medium text-foreground">
                    {upcomingFollowUps[0]
                      ? format(new Date(upcomingFollowUps[0]), "MMM d, yyyy")
                      : "—"}
                  </span>
                </p>
              )}
            </div>
          )}
        </Row>

        {/* Notes */}
        {appliedData.applicationNotes?.trim() && (
          <>
            <Separator />
            <Row icon={MessageSquare} label="Notes">
              <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-foreground/80">
                {appliedData.applicationNotes}
              </p>
            </Row>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AppliedDataDisplay;
