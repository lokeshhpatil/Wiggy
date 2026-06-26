import {Request, Response, NextFunction} from 'express';
import ApiError from '../utils/apiError.js';
import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js';

interface JwtPayload {
  _id: string;
}

export const verifyJWT = async(req: Request, res:Response, next:NextFunction):Promise<void> => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
  if(!token){
    throw new ApiError(401, "Unauthorized access: No token provided");
  }
  console.log("Token from req.cookies -> ", token);
try {

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload & { _id: string };  

  if(!decodedToken){
    throw new ApiError(401, "Unauthorized Access decodedToken not found");
  }
  console.log("Decoded Token -> ",decodedToken);
  
  const user = await User.findById(decodedToken._id).select("_id role name email").lean();
  if(!user){
    throw new ApiError(401, "Unauthorized access: Invalid token or user deleted")
  }

  req.user = {
    _id: user._id.toString(),
    role: user.role as "user" | "restaurant" | "rider",
    name: user.name,
    email: user.email,
  };
  next();
  
  console.log("req.user from auth.middleware response -> ",req.user)
} catch (error) {
  throw new ApiError(401, error instanceof Error ? error.message : "Invalid access token");
}
  
}