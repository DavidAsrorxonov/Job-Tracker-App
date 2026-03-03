"use client";

import { isBefore, isSameDay, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";

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
      return "Not Set";
  }
}

function methodBadgeVariant(m?: IAppliedData["applicationMethod"]) {
  return m ? "default" : "outline";
}

function normalizeDates(dates: (Date | string)[] | undefined): Date[] {
  const arr = (dates ?? []).map((d) => (d instanceof Date ? d : new Date(d)));
  const uniq: Date[] = [];
  for (const d of arr) {
    if (!uniq.some((x) => isSameDay(x, d))) uniq.push(d);
  }

  uniq.sort((a, b) => a.getTime() - b.getTime());
  return uniq;
}

function computeFollowUpMeta(followUps: Date[]) {
  const today = startOfDay(new Date());
  const pastOrToday = followUps.filter((d) => !isBefore(today, startOfDay(d)));
  const future = followUps.filter((d) => isBefore(today, startOfDay(d)));

  const last = pastOrToday.length
    ? pastOrToday[pastOrToday.length - 1]
    : undefined;

  const next = future.length ? future[0] : undefined;

  const isNextOverdue = next ? isBefore(startOfDay(next), today) : false;
  return { last, next, isNextOverdue };
}

function computeOverdueFromSchedule(followUps: Date[]) {
  const today = startOfDay(new Date());
  const overdue = followUps.some((d) => isBefore(startOfDay(d), today));
  return overdue;
}

export default function AppliedPanel({
  jobId,
  appliedData,
  resumes,
  onSave,
}: {
  jobId: string;
  appliedData: IAppliedData;
  resumes: string[];
  onSave: (jobId: string, values: IAppliedData) => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const followUps = useMemo(
    () => normalizeDates(appliedData?.followUpDates as any),
    [appliedData?.followUpDates],
  );

  const overdueFollowUp = useMemo(
    () => computeOverdueFromSchedule(followUps),
    [followUps],
  );

  const today = startOfDay(new Date());

  const expectedOverdue = appliedData?.expectedResponseDate
    ? isBefore(startOfDay(new Date(appliedData.expectedResponseDate)), today)
    : false;

  const lastFollowUp = followUps.length
    ? followUps.filter((d) => !isBefore(today, startOfDay(d))).slice(-1)[0]
    : undefined;
  const nextFollowUp = followUps.find((d) => isBefore(today, startOfDay(d)));

  const hasAnything =
    Boolean(appliedData?.appliedDate) ||
    Boolean(appliedData?.applicationMethod) ||
    Boolean(appliedData?.resumeVersion) ||
    Boolean(appliedData?.coverLetterUsed) ||
    Boolean(appliedData?.referralContact) ||
    followUps.length > 0 ||
    Boolean(appliedData?.expectedResponseDate) ||
    Boolean(appliedData?.applicationNotes?.trim());

  const [draft, setDraft] = useState<IAppliedData>(() => ({
    appliedDate: appliedData?.appliedDate
      ? new Date(appliedData.appliedDate)
      : new Date(),
    applicationMethod: appliedData?.applicationMethod,
    resumeVersion: appliedData?.resumeVersion,
    coverLetterUsed: appliedData?.coverLetterUsed ?? false,
    referralContact: appliedData?.referralContact ?? "",
    followUpDates: followUps,
    expectedResponseDate: appliedData?.expectedResponseDate
      ? new Date(appliedData.expectedResponseDate)
      : undefined,
    applicationNotes: appliedData?.applicationNotes ?? "",
    lastFollowUpDate: appliedData?.lastFollowUpDate
      ? new Date(appliedData.lastFollowUpDate)
      : undefined,
  }));

  useEffect(() => {
    setDraft({
      appliedDate: appliedData?.appliedDate
        ? new Date(appliedData.appliedDate)
        : new Date(),
      applicationMethod: appliedData?.applicationMethod,
      resumeVersion: appliedData?.resumeVersion,
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
  }, [jobId, appliedData?.appliedDate, appliedData?.expectedResponseDate]);
}
