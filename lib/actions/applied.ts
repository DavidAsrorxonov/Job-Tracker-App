"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { JobApplication } from "../models";
import { format } from "date-fns";

export async function upsertAppliedData(jobId: string, appliedData: any) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");

  await connectDB();

  const existing = await JobApplication.findOne(
    { _id: jobId, userId: session.user.id },
    { "appliedData.followUpDates": 1 },
  );

  const existingDates: string[] =
    existing?.appliedData?.followUpDates?.map((d: Date) =>
      new Date(d).toISOString(),
    ) ?? [];

  const incomingDates =
    appliedData.followUpDates?.map((d: any) => new Date(d).toISOString()) ?? [];

  const newDates = incomingDates.filter((d: any) => !existingDates.includes(d));

  const timelineEntries = newDates.map((d: any) => ({
    date: new Date(),
    action: "Follow-up scheduled",
    description: `Follow-up scheduled for ${format(new Date(d), "MMM d, yyyy")}`,
    type: "follow_up",
    automated: true,
  }));

  const updateOps: any = {
    $set: {
      appliedData: appliedData,
      updatedAt: new Date(),
    },
  };

  if (timelineEntries.length > 0) {
    updateOps.$push = {
      timeline: {
        $each: timelineEntries,
      },
    };
  }

  const result = await JobApplication.updateOne(
    { _id: jobId, userId: session.user.id },
    updateOps,
  );

  if (result.matchedCount === 0) {
    throw new Error("Job application not found or unauthorized");
  }

  const id = jobId;
  revalidatePath(`/dashboard/${id}`);
}
