import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  role: "user" | "restaurant" | "rider" | "admin";
  password: string;
  provider: string,
  refreshToken:string;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "restaurant", "rider"],
    required: true,
    default: "user",
  },
  password: {
    type: String,
    select: false,
    default: "local",
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default:"user",
  },
  refreshToken: {
    type: String
  },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema); 