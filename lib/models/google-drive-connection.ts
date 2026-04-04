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

const GoogleDriveConnectionSchema = new Schema<IGoogleDriveConnection>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: ["google-drive"],
      required: true,
      default: "google-drive",
    },
    googleEmail: {
      type: String,
      trim: true,
    },
    googleSub: {
      type: String,
      trim: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    scope: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
    driveFolderId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

GoogleDriveConnectionSchema.index({ userId: 1 }, { unique: true });

const GoogleDriveConnection =
  (mongoose.models.GoogleDriveConnection as Model<IGoogleDriveConnection>) ||
  mongoose.model<IGoogleDriveConnection>(
    "GoogleDriveConnection",
    GoogleDriveConnectionSchema,
  );

export default GoogleDriveConnection;
