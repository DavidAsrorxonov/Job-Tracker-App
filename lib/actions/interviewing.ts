"use server";

import { getSession } from "../auth/auth";
import connectDB from "../db";
import { JobApplication } from "../models";
import { revalidatePath } from "next/cache";

const typeLabel: Record<string, string> = {
  phone_screen: "Phone Screen",
  technical: "Technical",
  behavioral: "Behavioral",
  hiring_manager: "Hiring Manager",
  final: "Final Round",
  other: "Other",
};

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
        "interviewData.prepNotes": data.prepNotes,
        "interviewData.questionsToAsk": data.questionsToAsk,
        "interviewData.technicalTopics": data.technicalTopics,
        "interviewData.nextSteps": data.nextSteps,
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
          "interviewData.interviews._id": interview._id,
        },
        {
          $set: {
            "interviewData.interviews.$": interview,
            updatedAt: new Date(),
          },
        },
      )
    : await JobApplication.updateOne(
        { _id: jobId, userId: session.user.id },
        {
          $push: { "interviewData.interviews": interview },
          $set: { updatedAt: new Date() },
        },
      );

  if (result.matchedCount === 0)
    throw new Error("Job application not found or unauthorized");

  revalidatePath(`/dashboard/${jobId}`);
}

export async function deleteInterview(jobId: string, interviewId: string) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");

  await connectDB();

  const result = await JobApplication.updateOne(
    { _id: jobId, userId: session.user.id },
    { $pull: { "interviewData.interviews": { _id: interviewId } } },
  );

  if (result.matchedCount === 0)
    throw new Error("Job application not found or unauthorized");

  revalidatePath(`/dashboard/${jobId}`);
}
