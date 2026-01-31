"use server";

import { ColumnData } from "@/types/column-data";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column } from "../models";
import { revalidatePath } from "next/cache";

export const createColumn = async (data: ColumnData) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      error: "Unauthorized",
    };
  }

  await connectDB();

  const { name, boardId } = data;

  if (!name || !boardId) {
    return { error: "Missing required fields" };
  }

  const board = await Board.findOne({
    _id: boardId,
    userId: session.user.id,
  });

  if (!board) {
    return { error: "Board not found" };
  }

  const lastColumn = await Column.findOne({ boardId: board._id })
    .sort({ order: -1 })
    .select({ order: 1 })
    .lean();

  const newOrder = (lastColumn?.order ?? 0) + 1;

  const newColumn = await Column.create({
    name,
    boardId: board._id,
    order: newOrder,
    jobApplications: [],
  });

  await Board.updateOne(
    {
      _id: board._id,
    },
    {
      $push: { columns: newColumn._id },
    },
  );

  const leanedColumn = await Column.findById(newColumn._id).lean();

  revalidatePath("/dashboard");

  return { data: leanedColumn };
};
