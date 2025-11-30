import env from "@/infrastructure/config/env";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(env.mongoUrl);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo connection error:", err);
    process.exit(1);
  }
}
