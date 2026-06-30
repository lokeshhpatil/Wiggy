import { User } from "../model/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/jwt.js";
import { Types } from "mongoose";
import bcrypt from 'bcrypt';
import { Oauth } from "../config/google.config.js";
import axios from "axios";
import { CookieOptions } from "express";

  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
    sameSite: "lax"
  }

export const userLogin = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }
  let user = await User.findOne({ email }).select("+password role name email");
  if(!user) {
    throw new ApiError(401, "Invalid credentials.");
  }
  if(user.provider == "google") {
    throw new ApiError(400, "Login with google.");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    throw new ApiError(401, "Invalid Login Credentials");
  }

  const accessToken = generateAccessToken(user._id, user.role);
  // console.log("ACCESS_TOKEN -> ", accessToken);

  const safeUser = {
    _id: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, {user: safeUser, token: accessToken}, "login successful.")
    )
});

export const googleLogin = asyncHandler(async(req, res) => {
  const {code} = req.body;
  if(!code){
    throw new ApiError(400, "code required for google authentication.");
  }
  const googleResponse = await Oauth.getToken(code as string);
  if(!googleResponse || !googleResponse.tokens){
    throw new ApiError(400, "Failed to retrieve tokens from Google");
  }

  const {data: googleUser} = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);
  
  if(!googleUser.email) {
    throw new ApiError(400, "Google authentication failed to return an email.");
  }
  let user = await User.findOne({email: googleUser.email});
  if(!user) {
    user = await User.create({
      name: googleUser.name,
      email: googleUser.email,
      image: googleUser.image,
      role: googleUser.role,
      provider: "google",
    });
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
  res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .json(new ApiResponse(
    200,
    {user: safeUser, token: accessToken},
    "Google login successful"
  ));
});

const allowedRoles = ["user", "restaurant", "rider"] as const;
type Role = (typeof allowedRoles)[number];
export const updateUserRole = asyncHandler(async(req, res) => {
  const {role} = req.body;
  if(!role || !allowedRoles.includes(role)){
    throw new ApiError(400, `Invalid role. Must be one of: ${allowedRoles.join(", ")}`)
  }
  if(!req.user){
    throw new ApiError(401, "Unauthorized access");
  }
  const updatedRole = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        role: role,
      },
    },
    {
      new: true, runValidators:true
    }
  ).select("-password");

  if(!updatedRole){
    throw new ApiError(404, "User not found in the system");
  }
  const token = generateAccessToken(new Types.ObjectId(req.user._id), updatedRole.role);
  res
  .status(200)
  .cookie("accessToken", token, options)
  .json(new ApiResponse(200, {updatedRole, token}, "Role updated successfully"))
});

export const getProfile = asyncHandler(async(req, res) => {
  const user = req.user;
  res
  .status(200)
  .json(
    new ApiResponse(200, user, "MyProfile fetched successfully.")
  )
})

