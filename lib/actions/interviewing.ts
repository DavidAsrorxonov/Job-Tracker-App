"use server";

import { getSession } from "../auth/auth";
import connectDB from "../db";
import { JobApplication } from "../models";
import { revalidatePath } from "next/cache";

export async function upsertInterviewPrepData(
  jobId: string,
  data: {
    prepNotes?: string;
    questionsToAsk?: string[];
    technicalTopics?: string[];
    nextSteps?: string;
  },
) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");

  await connectDB();

  const result = await JobApplication.updateOne(
    { _id: jobId, userId: session.user.id },
    {
      $set: {
        "interviewingData.prepNotes": data.prepNotes,
        "interviewingData.questionsToAsk": data.questionsToAsk,
        "interviewingData.technicalTopics": data.technicalTopics,
        "interviewingData.nextSteps": data.nextSteps,
        updatedAt: new Date(),
      },
    },
  );

  if (result.matchedCount === 0)
    throw new Error("Job application not found or unauthorized");

  revalidatePath(`/dashboard/${jobId}`);
}

export async function upsertSingleInterview(jobId: string, interview: any) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");

  await connectDB();

  const isEdit = Boolean(interview._id);

  const result = isEdit
    ? await JobApplication.updateOne(
        {
          _id: jobId,
          userId: session.user.id,
          "interviewingData.interviews._id": interview._id,
        },
        {
          $set: {
            "interviewingData.interviews.$": interview,
            updatedAt: new Date(),
          },
        },
      )
    : await JobApplication.updateOne(
        { _id: jobId, userId: session.user.id },
        {
          $push: { "interviewingData.interviews": interview },
          $set: { updatedAt: new Date() },
        },
      );

  if (result.matchedCount === 0)
    throw new Error("Job application not found or unauthorized");

  revalidatePath(`/dashboard/${jobId}`);
}
