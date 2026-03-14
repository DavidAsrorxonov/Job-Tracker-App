"use server";

import { format } from "date-fns";
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

  const isEdit = !!interview._id;

  if (isEdit) {
    const existing = await JobApplication.findOne(
      { _id: jobId, userId: session.user.id },
      { "interviewData.interviews": 1 },
    );

    const existingInterview = existing?.interviewData?.interviews?.find(
      (i: any) => i._id.toString() === interview._id.toString(),
    );

    const outcomeChanged =
      existingInterview &&
      interview.outcome &&
      existingInterview.outcome !== interview.outcome;

    const updateOps: any = {
      $set: {
        "interviewData.interviews.$[elem]": interview,
        updatedAt: new Date(),
      },
    };

    if (outcomeChanged) {
      updateOps.$push = {
        timeline: {
          date: new Date(),
          action: "Interview outcome updated",
          description: `${typeLabel[interview.type] ?? "Interview"} marked as ${interview.outcome}`,
          type: "interview",
          automated: true,
        },
      };
    }

    await JobApplication.updateOne(
      { _id: jobId, userId: session.user.id },
      updateOps,
      { arrayFilters: [{ "elem._id": interview._id }] },
    );
  } else {
    await JobApplication.updateOne(
      { _id: jobId, userId: session.user.id },
      {
        $push: {
          "interviewData.interviews": interview,
          timeline: {
            date: new Date(),
            action: "Interview scheduled",
            description: `${typeLabel[interview.type] ?? "Interview"} interview scheduled${
              interview.scheduledDate
                ? ` for ${format(new Date(interview.scheduledDate), "MMM d, yyyy")}`
                : ""
            }`,
            type: "interview",
            automated: true,
          },
        },
        $set: { updatedAt: new Date() },
      },
    );
  }

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
