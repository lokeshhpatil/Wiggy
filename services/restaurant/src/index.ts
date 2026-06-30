import express, {Express} from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import restaurantRoute from "./routes/restaurant.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cookieParser());
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const corsOptions = {
  origin: corsOrigin === "*" ? true : corsOrigin,
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/v0/restaurants', restaurantRoute);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Restaurant file is running on PORT ${PORT}`);
})
