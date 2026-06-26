import { Document } from "mongoose";

export interface AuthenticatedUser{
  _id: string;
  role: "user" | "restaurant" | "rider";
  name: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}