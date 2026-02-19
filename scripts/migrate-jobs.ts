import mongoose from "mongoose";
import { JobApplication } from "../lib/models";
import connectDB from "@/lib/db";

async function migrate() {
  await connectDB();

  console.log("Starting migration...");

  await JobApplication.updateMany(
    { wishlistData: { $exists: false } },
    { $set: { wishlistData: {} } },
  );

  console.log("Stage 1 completed");

  await JobApplication.updateMany(
    { appliedData: { $exists: false } },
    { $set: { appliedData: {} } },
  );

  console.log("Stage 2 completed");

  await JobApplication.updateMany(
    { interviewData: { $exists: false } },
    { $set: { interviewData: { interviews: [] } } },
  );

  console.log("Stage 3 completed");

  await JobApplication.updateMany(
    { offerData: { $exists: false } },
    { $set: { offerData: {} } },
  );

  console.log("Stage 4 completed");

  await JobApplication.updateMany(
    { rejectedData: { $exists: false } },
    { $set: { rejectedData: {} } },
  );

  console.log("Stage 5 completed");

  await JobApplication.updateMany(
    { timeline: { $exists: false } },
    {
      $set: {
        timeline: [
          {
            date: new Date(),
            action: "Job added",
            type: "other",
            automated: true,
          },
        ],
      },
    },
  );

  console.log("Migration complete ✅");
  process.exit(0);
}

migrate();
