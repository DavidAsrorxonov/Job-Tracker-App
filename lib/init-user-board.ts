import { DEFAULT_COLUMNS } from "@/constants/default-columns";
import connectDB from "./db";
import { Board, Column, JobApplication } from "./models";

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();

    const existingBoard = await Board.findOne({
      userId,
      name: "Job Hunt",
    });

    if (existingBoard) {
      return existingBoard;
    }

    const board = await Board.create({
      name: "Job Hunt",
      userId,
      column: [],
    });

    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplication: [],
        }),
      ),
    );

    board.columns = columns.map((col) => col._id);

    await board.save();
  } catch (error) {
    throw error;
  }
}
