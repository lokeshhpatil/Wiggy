import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateAccessToken = (userId: Types.ObjectId) => {
  return jwt.sign(
    {
      _id: userId,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
    }
  );
}