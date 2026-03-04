"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import UserDocuments from "../models/user-documents";

export const setUnsetDefaultCvCoverLetter = async (
  docId: string,
  type: "cv" | "cover-letter",
): Promise<{ success: boolean; error?: string }> => {
  try {
    const session = await getSession();

    if (!session?.user.id) throw new Error("Unauthorized");

    await connectDB();

    await UserDocuments.updateMany(
      { userId: session?.user.id, type },
      { $set: { isDefault: false } },
    );

    if (docId) {
      await UserDocuments.updateOne(
        { _id: docId, userId: session?.user.id },
        { $set: { isDefault: true } },
      );
    }

    revalidatePath("/dashboard/upload");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
