import {Request, Response, NextFunction} from 'express';
import ApiError from '../utils/apiError.js';
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js';

// import { User } from '../model/user.model.js';


interface JwtPayload {
  _id: string;
  role: "user" | "restaurant" | "rider";
}

export const verifyJWt = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized access: No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
    
    req.user = {
      _id: decodedToken._id,
      role: decodedToken.role
    };

    next();
  } catch (error) {
    throw new ApiError(401, error instanceof Error ? error.message : "Invalid access token");
  }
})