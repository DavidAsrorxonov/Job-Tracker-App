"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { JobApplication } from "../models";
import { IOfferData } from "../models/job-application";

export async function upsertOfferData(jobId: string, data: IOfferData) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");
  await connectDB();
  const result = await JobApplication.updateOne(
    { _id: jobId, userId: session.user.id },
    { $set: { offerData: data, updatedAt: new Date() } },
  );
  if (result.matchedCount === 0)
    throw new Error("Job application not found or unauthorized");
  revalidatePath(`/dashboard/${jobId}`);
}
