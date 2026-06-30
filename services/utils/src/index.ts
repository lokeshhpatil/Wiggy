import express, {Express} from "express";
import cloudinary from "cloudinary"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/cloudinary.js";


dotenv.config();

const app : Express = express();
app.use(cors());
app.use("/api", router)


app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({limit:"50mb", extended: true}))










const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY} = process.env;
if(!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_SECRET_KEY) {
  throw new Error("Missing Enviroment Variables")
}
cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key:CLOUD_API_KEY,
  api_secret:CLOUD_SECRET_KEY,
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  // connectDB();
  console.log("Utils, MongoDB connected successfully.")
})