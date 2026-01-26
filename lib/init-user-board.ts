import connectDB from "./db";
import { Board, Column, JobApplication } from "./models";

export async function initializeUserBoard(userId: string) {
  try {
    await connectDB();
  } catch (error) {
    throw error;
  }
}
