import mongoose, {Schema, Document} from "mongoose";

export interface IRestaurant extends Document{
  name: string;
  description?: string;
  image: string;
  ownerID: string;
  phone: number;
  isVerified: boolean;

  autoLocation: {
    type: "Point",
    coordinates: [number, number], //longtitude latitude
    formattedAddress: string;
  };
  
  isOpen: boolean;
  createdAt: Date;
}

const restaurantSchema: Schema<IRestaurant> = new Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  description: String,
  image:{
    type:String,
    required:true,
  },
  ownerID:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:Number,
    required:true,
    unique:true
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  autoLocation: {
    type: {
      type: String, // 'type' is a reserved Mongoose keyword, so we nest it
      enum: ["Point"], // GeoJSON requires exactly this string
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // MongoDB requires this exact order: [longitude, latitude]
      required: true,
    },
    formattedAddress: {
      type: String,
      required: true,
    },
  },
  isOpen:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

restaurantSchema.index({autoLocation:"2dsphere"});

export const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
