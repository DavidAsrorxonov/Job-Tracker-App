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
    <div className="flex items-start gap-3 text-sm">
      <div className="flex items-center gap-2 w-36 shrink-0 text-muted-foreground">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">{label}</span>
      </div>
      <div className="flex-1 text-foreground">{children}</div>
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
        <CardContent className="px-6 py-10 flex flex-col items-center justify-center text-center gap-3">
          <CalendarDays
            className="h-12 w-12 text-muted-foreground/20"
            strokeWidth={1}
          />
          <p className="text-sm font-medium text-muted-foreground">
            No applied data
          </p>
          <p className="text-xs text-muted-foreground/60 max-w-48">
            No details were recorded when this job was marked as applied.
          </p>
        </CardContent>
      </Card>
    );

  const today = startOfDay(new Date());
  const followUps = appliedData.followUpDates ?? [];
  const overdueFollowUps = followUps.filter((d) =>
    isBefore(startOfDay(new Date(d)), today),
  );
  const upcomingFollowUps = followUps.filter(
    (d) => !isBefore(startOfDay(new Date(d)), today),
  );

  return (
    <Card className="w-full border-border/60 shadow-sm opacity-90">
      <CardHeader className="border-b border-border/50 bg-muted/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight text-muted-foreground">
              Applied Details
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Recorded when you applied · Read only
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-xs font-normal gap-1 text-muted-foreground"
          >
            <CalendarDays className="h-3 w-3" />
            {format(new Date(appliedData.appliedDate), "MMM d, yyyy")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-5 space-y-3.5">
        {/* Method */}
        <Row icon={Mail} label="Method">
          {methodLabel(appliedData.applicationMethod) ? (
            <Badge variant="secondary" className="text-xs font-normal">
              {methodLabel(appliedData.applicationMethod)}
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              Not set
            </span>
          )}
        </Row>

        <Separator />

        {/* Resume */}
        <Row icon={FileText} label="Resume">
          {appliedData.resumeVersion ? (
            <span className="text-sm">{appliedData.resumeVersion}</span>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              Not set
            </span>
          )}
        </Row>

        <Separator />

        {/* Cover Letter */}
        <Row icon={Mail} label="Cover Letter">
          {appliedData.coverLetterUsed ? (
            <div className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-xs">Used</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <XCircle className="h-3.5 w-3.5" />
              <span className="text-xs">Not used</span>
            </div>
          )}
        </Row>

        {/* Referral */}
        {appliedData.referralContact?.trim() && (
          <>
            <Separator />
            <Row icon={User} label="Referral">
              <span className="text-sm">{appliedData.referralContact}</span>
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
                "text-xs font-normal",
                isBefore(
                  startOfDay(new Date(appliedData.expectedResponseDate)),
                  today,
                )
                  ? "border-destructive/30 text-destructive bg-destructive/5"
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
            <span className="text-xs text-muted-foreground italic">
              Not set
            </span>
          )}
        </Row>

        <Separator />

        {/* Follow Ups */}
        <Row icon={Bell} label="Follow Ups">
          {followUps.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">
              None added
            </span>
          ) : (
            <div className="space-y-1">
              {overdueFollowUps.length > 0 && (
                <p className="text-xs text-destructive/80">
                  {overdueFollowUps.length} overdue
                </p>
              )}
              {upcomingFollowUps.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {upcomingFollowUps.length} upcoming · Next:{" "}
                  <span className="font-medium text-foreground">
                    {format(new Date(upcomingFollowUps[0]), "MMM d, yyyy")}
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
              <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
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
