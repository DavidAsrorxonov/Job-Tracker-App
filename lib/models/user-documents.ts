import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDocuments extends Document {
  userId: mongoose.Types.ObjectId;
  type: "cv" | "cover-letter";
  path: string;
  label?: string;
  isDefault: boolean;
  originalName?: string;
  size?: number;
  mimeType?: string;

  createdAt: Date;
  updatedAt: Date;
}

const UserDocumentsSchema = new Schema<IUserDocuments>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    type: {
      type: String,
      enum: ["cv", "cover-letter"],
      required: true,
      index: true,
    },
    path: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
      index: true,
    },
    originalName: { type: String },
    size: { type: Number },
    mimeType: { type: String },
  },
  { timestamps: true },
);

UserDocumentsSchema.index({ userId: 1, type: 1, createdAt: -1 });

UserDocumentsSchema.index(
  { userId: 1, type: 1, isDefault: 1 },
  { unique: true, partialFilterExpression: { isDefault: true } },
);

const UserDocuments =
  (mongoose.models.UserDocuments as Model<IUserDocuments>) ||
  mongoose.model<IUserDocuments>("UserDocuments", UserDocumentsSchema);

export default UserDocuments;
