import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateAccessToken = (userId: Types.ObjectId | string, role: string) => {
  return jwt.sign(
    {
      _id: userId,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
    }
  );
}