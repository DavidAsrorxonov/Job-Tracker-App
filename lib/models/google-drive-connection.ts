import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGoogleDriveConnection extends Document {
  userId: mongoose.Types.ObjectId;
  provider: "google-drive";
  googleEmail?: string;
  googleSub?: string;
  accessToken: string;
  refreshToken?: string;
  scope?: string;
  expiryDate?: Date;
  driveFolderId: string;

  createdAt: Date;
  updatedAt: Date;
}
