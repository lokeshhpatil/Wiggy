import {Request, Response, NextFunction} from 'express';
import ApiError from '../utils/apiError.js';
import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js';

interface JwtPayload {
  _id: string;
}

export const verifyJWT = async(req: Request, res:Response, next:NextFunction):Promise<void> => {
  const token = req.cookies?.accessToken;

  if(!token){
    throw new ApiError(401, "Unauthorized access: No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload & { _id: string };

    if(!decodedToken){
      throw new ApiError(401, "Unauthorized Access decodedToken not found");
    }

    const user = await User.findById(decodedToken._id).select("_id role").lean();
    if(!user){
      throw new ApiError(401, "Unauthorized access: Invalid token or user deleted");
    }

    req.user = {
      _id: user._id.toString(),
      role: user.role as "user" | "restaurant" | "rider",
    };
    next();
  } catch (error) {
    throw new ApiError(401, error instanceof Error ? error.message : "Invalid access token");
  }
}