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
  } catch (error) {
    throw error;
  }
}
