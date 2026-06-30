import {Request, Response, NextFunction} from 'express';
import ApiError from '../utils/apiError.js';
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js';
// import ApiResponse from '../utils/apiResponse.js';

interface JwtPayload {
  _id?: string;
  role?: "user" | "restaurant" | "rider";
  restaurantID?: string;
  user?: {
    _id?: string;
    role?: "user" | "restaurant" | "rider";
    restaurantID?: string;
  };
}

export const verifyJWt = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized access: No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
    const tokenUser = decodedToken.user ?? decodedToken;

    if (!tokenUser._id) {
      throw new ApiError(401, "Invalid access token payload");
    }

    req.user = {
      _id: tokenUser._id,
      role: tokenUser.role ?? "user",
      ...(tokenUser.restaurantID ? { restaurantID: tokenUser.restaurantID } : {}),
    };

    next();
  } catch (error) {
    throw new ApiError(401, error instanceof Error ? error.message : "Invalid access token");
  }
})

export const verifySeller = asyncHandler(async(req: Request, res: Response, next: NextFunction):Promise<void> => {
  const user = req.user;
  if(!user) {
    throw new ApiError(401,"User not found");
  }
  if(user && user.role !== "restaurant") {
    res
    .status(401)
    .json({
      message: "Unauthorized restaurant owner"
    });
    return;
  }
  next();
})
