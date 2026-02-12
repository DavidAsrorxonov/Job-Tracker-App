"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { JobApplication } from "../models";

export async function upsertWishlistData(jobId: string, wishlistData: any) {
  const session = await getSession();
  if (!session?.user.id) throw new Error("Unauthorized");

  await connectDB();

  await JobApplication.updateOne(
    { _id: jobId, userId: session.user.id },
    {
      $set: {
        wishlistData,
        updatedAt: new Date(),
      },
    },
  );

  revalidatePath("/dashboard/${id}");
}
