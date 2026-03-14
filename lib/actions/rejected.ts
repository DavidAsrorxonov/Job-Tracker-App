// lib/actions/rejected.ts
"use server";

import { getSession } from "../auth/auth";
import connectDB from "../db";
import { JobApplication } from "../models";
import { revalidatePath } from "next/cache";

export async function upsertRejectedData(jobId: string, data: any) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");

  await connectDB();

  const result = await JobApplication.updateOne(
    { _id: jobId, userId: session.user.id },
    { $set: { rejectedData: data, updatedAt: new Date() } },
  );

  if (result.matchedCount === 0)
    throw new Error("Job application not found or unauthorized");

  revalidatePath(`/dashboard/${jobId}`);
}
