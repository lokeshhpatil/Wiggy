import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoute from "./router/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 4000;
console.log("process.env.PORT : ", process.env.PORT);

app.use(express.json());
app.use("/api/v0/auth", authRoute);
app.use(cookieParser());

app.listen(PORT, () => {
  connectDB();
  console.log(`Auth file is running on PORT ${PORT}`);
});

