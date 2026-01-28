// test/db-connection.test.js
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not found in .env.local");
}

await mongoose.connect(MONGODB_URI);
console.log("✅ Connected");
