import axios from "axios";
import getBuffer from "../config/datauri.js";
import { Restaurant } from "../model/restaurant.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Response, Request } from "express";
import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const addNewRestaurant = asyncHandler(async(req: Request, res:Response) => {
  const user = req.user;
  if(!user) {
    throw new ApiError(401, "Invalid user")
  }

  const existingRestaurant = await Restaurant.findOne({
    ownerID: user._id
  })

  if(existingRestaurant) {
    throw new ApiError(400, "Restaurant already exist with current OwnerID");
  }

  const {name, description, phone, latitude, longitude, formattedAddress} = req.body;
  if(!name || !description || !phone || !latitude || !longitude || !formattedAddress) {
    throw new ApiError(400, "Please fill the required information.");
  }

  const file = req.file;
  if(!file) {
    throw new ApiError(400, "Restaurant image is required.");
  }

  const bufferFile = getBuffer(file);
  if(!bufferFile?.content) {
    throw new ApiError(501, "Error while creating buffer image URI");
  }

  let uploadUrl = "";
  try {
    const { data: uploadFile } = await axios.post(`${process.env.UTILS_SERVICE}/api/upload`,
      {
        buffer: bufferFile?.content,
      },
      {
        timeout: 10000,
      }
    );

    if(uploadFile?.url){
      uploadUrl = uploadFile.url;
    }
  } catch (error) {
    uploadUrl = "";
  }

  const restaurant = await Restaurant.create({
    name,
    description,
    image: uploadUrl || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    ownerID: user._id,
    phone,
    autoLocation: {
      type: "Point",
      coordinates: [Number(longitude), Number(latitude)],
      formattedAddress
    }
  });
  return res
  .status(201)
  .json(new ApiResponse(
    201, 
    {restaurant}, 
    "Restaurant created successfullty"
  ));
  
})

export const fetchRestaurant = asyncHandler(async(req: Request, res: Response) => {

  const user = req.user;
  if(!user) {
    throw new ApiError(401, "please Login")
  }

  const restaurant = await Restaurant.findOne({ownerID: user._id});
  if(!restaurant){
    throw new ApiError(401, "Restaurant not found.")
  }

  const token = jwt.sign({
    _id: user._id,
    role: user.role,
    restaurantID: restaurant._id,
  },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '7d' as any,
    })
    res
    .status(200)
    .json(new ApiResponse(200, {restaurant, token}, "restaurant fetched successfully."))
})