import mongoose, { Schema, Document } from "mongoose";

export interface IJobApplication extends Document {
  company: string;
  position: string;
  location?: string;
  status: string;
  columnId: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  userId: string;
  order: number;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  appliedDate?: Date;
  tags?: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
