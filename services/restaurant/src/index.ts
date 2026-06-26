import express, {Express} from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Auth file is running on PORT ${PORT}`);
})
