import mongoose from "mongoose";

export const connectDB = async() => {
  try {
      await mongoose.connect(process.env.MONGO_URI as string, {
      dbName:"Wiggy_Food",
    });
    console.log("Restaurant MONGODB connected successfully");
    // console.log("Mongo instance: ", connectionInstance);
    
  } catch (error) {
    console.log("Error while connectig to the MongoDB database: ",error);
  }
}