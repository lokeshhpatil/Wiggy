import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoute from "./router/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 4000;
console.log("process.env.PORT : ", process.env.PORT);

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: corsOrigin === "*" ? true : corsOrigin,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v0/auth", authRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Auth file is running on PORT ${PORT}`);
});

