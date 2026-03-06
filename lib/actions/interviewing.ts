"use server";

import { read } from "fs";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { JobApplication } from "../models";
import { revalidatePath } from "next/cache";

export async function upsertInterviewingData(
  jobId: string,
  interviewingData: any,
) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");

  await connectDB();

  const result = await JobApplication.updateOne(
    {
      _id: jobId,
      userId: session.user.id,
    },
    {
      $set: {
        interviewingData,
        updatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0) {
    throw new Error("Job application not found or unauthorized");
  }

  const id = jobId;
  revalidatePath(`/dashboard/${id}`);
}
