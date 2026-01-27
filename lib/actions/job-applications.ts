"use server";

import { FormData } from "@/types/form-data";
import { getSession } from "../auth/auth";
import connectDB from "../db";

export const createJobApplication = async (data: FormData) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      error: "Unauthorized",
    };
  }

  await connectDB();

  const {
    company,
    position,
    location,
    notes,
    salary,
    jobUrl,
    columnId,
    boardId,
    tags,
    description,
  } = data;
};
