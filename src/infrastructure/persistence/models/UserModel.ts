import { User } from "@/domain/entities/User";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<User>(
  {
    address: { type: String, unique: true },
    chatId: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<User>("User", UserSchema);
