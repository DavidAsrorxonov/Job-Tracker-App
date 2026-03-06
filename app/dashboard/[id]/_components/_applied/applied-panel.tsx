"use client";

import { Chip } from "@/components/chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { upsertAppliedData } from "@/lib/actions/applied";
import { normalizeDates } from "@/lib/helper/normalizeDates";
import { IUserDocuments } from "@/lib/models/user-documents";
import { cn } from "@/lib/utils";
import { UserDoc } from "@/types/user-documents";
import { format, isBefore, isSameDay, startOfDay, addDays } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock,
  Plus,
  Send,
  TriangleAlert,
  Sparkles,
  FileText,
  MessageSquare,
  Bell,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export interface IAppliedData {
  appliedDate: Date;
  applicationMethod?: "linkedin" | "company_site" | "referral" | "other";
  resumeVersion?: string;
  coverLetterUsed?: boolean;
  referralContact?: string;
  followUpDates?: Date[];
  lastFollowUpDate?: Date;
  expectedResponseDate?: Date;
  applicationNotes?: string;
}

type EditingKey =
  | "appliedDate"
  | "method"
  | "resume"
  | "coverLetter"
  | "referral"
  | "expected"
  | "notes"
  | null;

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
      return "Not set";
  }
}

function computeLastNextFollowUp(followUps: Date[]) {
  const today = startOfDay(new Date());
  const pastOrToday = followUps.filter((d) => !isBefore(today, startOfDay(d)));
  const future = followUps.filter((d) => isBefore(today, startOfDay(d)));
  const last = pastOrToday.length
    ? pastOrToday[pastOrToday.length - 1]
    : undefined;
  const next = future.length ? future[0] : undefined;
  return { last, next };
}

function hasOverdueFollowUp(followUps: Date[]) {
  const today = startOfDay(new Date());
  return followUps.some((d) => isBefore(startOfDay(d), today));
}

const STEPS = [
  { key: "applied", label: "Applied", icon: Sparkles },
  { key: "followups", label: "Follow-ups", icon: Bell },
  { key: "expected", label: "Expected response", icon: Clock },
  { key: "notes", label: "Notes", icon: MessageSquare },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function TimelineStep({
  stepKey,
  icon: Icon,
  label,
  isLast = false,
  status = "pending",
  badge,
  children,
}: {
  stepKey: StepKey;
  icon: React.ElementType;
  label: string;
  isLast?: boolean;
  status?: "done" | "active" | "pending" | "warn";
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  const dotColor = {
    done: "bg-emerald-500 ring-emerald-200 dark:ring-emerald-800",
    active: "bg-primary ring-primary/20",
    warn: "bg-destructive ring-destructive/20",
    pending: "bg-muted-foreground/40 ring-transparent",
  }[status];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 transition-all duration-300",
            dotColor,
          )}
        >
          <Icon className="h-3.5 w-3.5 text-white" />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-border min-h-6" />}
      </div>

      <div className={cn("flex-1 pb-8", isLast && "pb-2")}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold tracking-tight">{label}</p>
          {badge}
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AppliedPanel({
  jobId,
  appliedData,
  cvDocs,
}: {
  jobId: string;
  appliedData?: IAppliedData;
  cvDocs: UserDoc[];
}) {
  const today = startOfDay(new Date());
  const [saving, setSaving] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const [editing, setEditing] = useState<EditingKey>(null);
  const [data, setData] = useState<IAppliedData>(() => {
    const defaultCV = cvDocs.find((d) => d.isDefault); // ✅ compute inside initializer
    return {
      appliedDate: appliedData?.appliedDate
        ? new Date(appliedData.appliedDate)
        : new Date(),
      applicationMethod: appliedData?.applicationMethod,
      resumeVersion: appliedData?.resumeVersion ?? defaultCV?._id ?? undefined, // ✅
      coverLetterUsed: appliedData?.coverLetterUsed ?? false,
      referralContact: appliedData?.referralContact ?? "",
      followUpDates: normalizeDates(appliedData?.followUpDates as any),
      expectedResponseDate: appliedData?.expectedResponseDate
        ? new Date(appliedData.expectedResponseDate)
        : undefined,
      applicationNotes: appliedData?.applicationNotes ?? "",
      lastFollowUpDate: appliedData?.lastFollowUpDate
        ? new Date(appliedData.lastFollowUpDate)
        : undefined,
    };
  });

  function updateData(updater: (p: IAppliedData) => IAppliedData) {
    setData(updater);
    setIsDirty(true);
  }

  useEffect(() => {
    const defaultCV = cvDocs.find((d) => d.isDefault);
    setData({
      appliedDate: appliedData?.appliedDate
        ? new Date(appliedData.appliedDate)
        : new Date(),
      applicationMethod: appliedData?.applicationMethod,
      resumeVersion:
        appliedData?.resumeVersion ?? defaultCV?._id?.toString() ?? undefined,
      coverLetterUsed: appliedData?.coverLetterUsed ?? false,
      referralContact: appliedData?.referralContact ?? "",
      followUpDates: normalizeDates(appliedData?.followUpDates as any),
      expectedResponseDate: appliedData?.expectedResponseDate
        ? new Date(appliedData.expectedResponseDate)
        : undefined,
      applicationNotes: appliedData?.applicationNotes ?? "",
      lastFollowUpDate: appliedData?.lastFollowUpDate
        ? new Date(appliedData.lastFollowUpDate)
        : undefined,
    });
    setIsDirty(false);
  }, [jobId, appliedData]);

  const followUps = useMemo(
    () => normalizeDates(data.followUpDates as any),
    [data.followUpDates],
  );
  const { last: lastFollowUp, next: nextFollowUp } = useMemo(
    () => computeLastNextFollowUp(followUps),
    [followUps],
  );
  const overdueFollowUp = useMemo(
    () => hasOverdueFollowUp(followUps),
    [followUps],
  );

  const expectedOverdue = useMemo(() => {
    if (!data.expectedResponseDate) return false;
    return isBefore(startOfDay(data.expectedResponseDate), today);
  }, [data.expectedResponseDate, today]);

  const nextFollowUpIsHighlighted = (d: Date) =>
    Boolean(nextFollowUp && isSameDay(nextFollowUp, d));
  const isPast = (d: Date) => isBefore(startOfDay(d), today);

  function addFollowUp(date: Date | undefined) {
    if (!date) return;
    updateData((p) => ({
      ...p,
      followUpDates: normalizeDates([...(p.followUpDates ?? []), date]),
    }));
  }

  function removeFollowUp(date: Date) {
    updateData((p) => ({
      ...p,
      followUpDates: normalizeDates(p.followUpDates).filter(
        (d) => !isSameDay(d, date),
      ),
    }));
  }

  async function handleSave() {
    const computedLast = followUps
      .filter((d) => !isBefore(today, startOfDay(d)))
      .slice(-1)[0];
    const payload: IAppliedData = {
      ...data,
      followUpDates: followUps,
      lastFollowUpDate: computedLast,
    };

    try {
      setSaving(true);
      await upsertAppliedData(jobId, payload);
      setIsDirty(false);
      toast.success("Saved", {
        duration: 2000,
        description: "Your changes have been saved",
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to save", {
        duration: 2000,
        description: "Something went wrong. Please try again",
        position: "top-center",
      });
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  const selectedCv = cvDocs.find((d) => d._id === data.resumeVersion);
  const resumeLabel = selectedCv
    ? (selectedCv.originalName ??
      selectedCv.path.split("/").pop() ??
      "Unnamed CV")
    : data.resumeVersion
      ? "CV not found"
      : "Select resume";

  return (
    <Card className="w-full shadow-sm border-border/60 h-fit overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-semibold tracking-tight">
              Application Journey
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Click any chip to edit · Press save when done
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isDirty && (
              <span className="text-xs text-muted-foreground">
                Unsaved changes
              </span>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving || !isDirty}
              className="h-7 text-xs"
            >
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pt-7 pb-6">
        <div className="space-y-0">
          {/* Applied Stage */}
          <TimelineStep
            stepKey="applied"
            icon={Sparkles}
            label="Applied"
            status="active"
            badge={
              <Badge
                variant="outline"
                className="text-xs font-normal text-muted-foreground"
              >
                {format(data.appliedDate, "MMM d, yyyy")}
              </Badge>
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              {editing === "appliedDate" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                      {format(data.appliedDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={data.appliedDate}
                      onSelect={(d) => {
                        if (!d) return;
                        updateData((p) => ({ ...p, appliedDate: d }));
                        setEditing(null);
                      }}
                      autoFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Chip
                  onClick={() => setEditing("appliedDate")}
                  variant="primary"
                >
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {format(data.appliedDate, "PPP")}
                </Chip>
              )}

              {editing === "method" ? (
                <Select
                  value={data.applicationMethod ?? ""}
                  onValueChange={(v) => {
                    updateData((p) => ({ ...p, applicationMethod: v as any }));
                    setEditing(null);
                  }}
                >
                  <SelectTrigger className="h-7 w-40 text-xs">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="company_site">Company Site</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Chip
                  onClick={() => setEditing("method")}
                  variant={data.applicationMethod ? "primary" : "ghost"}
                >
                  {methodLabel(data.applicationMethod)}
                </Chip>
              )}

              {editing === "resume" ? (
                <Select
                  value={data.resumeVersion ?? ""}
                  onValueChange={(v) => {
                    updateData((p) => ({ ...p, resumeVersion: v }));
                    setEditing(null);
                  }}
                >
                  <SelectTrigger className="h-7 w-56 text-xs">
                    <SelectValue placeholder="Select resume" />
                  </SelectTrigger>
                  <SelectContent>
                    {cvDocs.length === 0 ? (
                      <SelectItem value="__none" disabled>
                        No CVs uploaded
                      </SelectItem>
                    ) : (
                      cvDocs.map((doc) => (
                        <SelectItem
                          key={doc._id.toString()}
                          value={doc._id.toString()}
                        >
                          <div className="flex items-center gap-2">
                            {doc.originalName ?? doc.path.split("/").pop()}
                            {doc.isDefault && (
                              <Badge
                                variant="secondary"
                                className="text-xs py-0 font-normal"
                              >
                                default
                              </Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              ) : (
                <Chip onClick={() => setEditing("resume")} variant="secondary">
                  <FileText className="h-3 w-3 mr-1" />
                  {resumeLabel}
                </Chip>
              )}

              <Chip
                onClick={() =>
                  updateData((p) => ({
                    ...p,
                    coverLetterUsed: !p.coverLetterUsed,
                  }))
                }
                variant={data.coverLetterUsed ? "primary" : "ghost"}
              >
                Cover letter: {data.coverLetterUsed ? "Yes" : "No"}
              </Chip>

              {editing === "referral" ? (
                <div className="flex items-center gap-2">
                  <Input
                    autoFocus
                    value={data.referralContact ?? ""}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        referralContact: e.target.value,
                      }))
                    }
                    onBlur={() => setEditing(null)}
                    placeholder="Referral contact"
                    className="h-7 w-48 text-xs"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => setEditing(null)}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <Chip onClick={() => setEditing("referral")} variant="ghost">
                  Referral:{" "}
                  {data.referralContact?.trim() ? data.referralContact : "None"}
                </Chip>
              )}
            </div>
          </TimelineStep>

          {/* Follow-ups Stage */}
          <TimelineStep
            stepKey="followups"
            icon={Bell}
            label="Follow-ups"
            status={
              overdueFollowUp
                ? "warn"
                : followUps.length > 0
                  ? "done"
                  : "pending"
            }
            badge={
              overdueFollowUp ? (
                <Badge
                  variant="destructive"
                  className="text-xs font-normal gap-1"
                >
                  <TriangleAlert className="h-3 w-3" /> Overdue
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-xs font-normal text-muted-foreground"
                >
                  On track
                </Badge>
              )
            }
          >
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  Last:{" "}
                  <span className="text-foreground font-medium">
                    {lastFollowUp ? format(lastFollowUp, "MMM d, yyyy") : "—"}
                  </span>
                </span>
                <span>
                  Next:{" "}
                  <span
                    className={cn(
                      "text-foreground",
                      nextFollowUp && "font-semibold text-primary",
                    )}
                  >
                    {nextFollowUp ? format(nextFollowUp, "MMM d, yyyy") : "—"}
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1.5"
                  onClick={() => addFollowUp(addDays(new Date(), 3))}
                >
                  <Plus className="h-3 w-3" /> +3 days
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1.5"
                  onClick={() => addFollowUp(addDays(new Date(), 7))}
                >
                  <Plus className="h-3 w-3" /> +7 days
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1.5"
                    >
                      <CalendarDays className="h-3 w-3" /> Custom
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={undefined}
                      onSelect={(d) => addFollowUp(d)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {followUps.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  No follow-ups yet. Add one to stay on top of responses.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {followUps.map((d) => {
                    const past = isPast(d);
                    const next = nextFollowUpIsHighlighted(d);
                    return (
                      <div
                        key={d.toISOString()}
                        className={cn(
                          "flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-colors",
                          next && "border-primary/40 bg-primary/5",
                          past &&
                            !next &&
                            "border-destructive/30 bg-destructive/5",
                          !next && !past && "border-border bg-muted/30",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {past ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                          ) : next ? (
                            <Send className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <CircleDashed className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                          <span
                            className={cn(
                              "font-medium",
                              next && "text-primary",
                            )}
                          >
                            {format(d, "MMM d, yyyy")}
                          </span>
                          {next && (
                            <Badge
                              variant="secondary"
                              className="text-xs font-normal py-0"
                            >
                              next
                            </Badge>
                          )}
                          {past && (
                            <Badge
                              variant="destructive"
                              className="text-xs font-normal py-0"
                            >
                              overdue
                            </Badge>
                          )}
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs text-muted-foreground hover:text-destructive px-2"
                          onClick={() => removeFollowUp(d)}
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TimelineStep>

          {/* Expected response Stage */}
          <TimelineStep
            stepKey="expected"
            icon={Clock}
            label="Expected response"
            status={
              expectedOverdue
                ? "warn"
                : data.expectedResponseDate
                  ? "done"
                  : "pending"
            }
            badge={
              expectedOverdue ? (
                <Badge
                  variant="destructive"
                  className="text-xs font-normal gap-1"
                >
                  <TriangleAlert className="h-3 w-3" /> Overdue
                </Badge>
              ) : undefined
            }
          >
            {editing === "expected" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    {data.expectedResponseDate
                      ? format(data.expectedResponseDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={data.expectedResponseDate}
                    onSelect={(d) => {
                      updateData((p) => ({
                        ...p,
                        expectedResponseDate: d ?? undefined,
                      }));
                      setEditing(null);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Chip
                onClick={() => setEditing("expected")}
                variant={data.expectedResponseDate ? "secondary" : "ghost"}
              >
                <Clock className="h-3 w-3 mr-1" />
                {data.expectedResponseDate
                  ? format(data.expectedResponseDate, "PPP")
                  : "Not set — click to add"}
              </Chip>
            )}
          </TimelineStep>

          {/* Notes Stage */}
          <TimelineStep
            stepKey="notes"
            icon={MessageSquare}
            label="Notes"
            isLast
            status={data.applicationNotes?.trim() ? "done" : "pending"}
          >
            {editing === "notes" ? (
              <Textarea
                autoFocus
                value={data.applicationNotes ?? ""}
                onChange={(e) =>
                  updateData((p) => ({
                    ...p,
                    applicationNotes: e.target.value,
                  }))
                }
                onBlur={() => setEditing(null)}
                className="min-h-24 text-sm resize-none"
                placeholder="What did you send? Any context? Follow-up message template?"
              />
            ) : (
              <p
                className={cn(
                  "text-sm whitespace-pre-wrap cursor-pointer rounded-md border border-dashed border-border/60 px-3 py-2.5 transition-colors hover:border-border hover:bg-muted/40",
                  data.applicationNotes?.trim()
                    ? "text-foreground"
                    : "text-muted-foreground italic",
                )}
                onClick={() => setEditing("notes")}
              >
                {data.applicationNotes?.trim()
                  ? data.applicationNotes
                  : "Click to add notes…"}
              </p>
            )}
          </TimelineStep>
        </div>

        <Separator className="my-4" />

        <p className="text-xs text-muted-foreground">
          Tip: Use{" "}
          <span className="font-semibold text-foreground">+7 days</span>{" "}
          follow-ups to stay consistent.
        </p>
      </CardContent>
    </Card>
  );
}
