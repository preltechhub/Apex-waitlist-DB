import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  if (!env.mongodbUri) {
    throw new Error("MONGODB_URI is not defined.");
  }

  await mongoose.connect(env.mongodbUri);

  console.log("MongoDB connected successfully.");
}
