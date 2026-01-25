import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  userId: string;
  columns: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
