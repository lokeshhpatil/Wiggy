import { Router } from "express";
import { verifyJWt, verifySeller } from "../middleware/auth.middleware.js";
import { addNewRestaurant, fetchRestaurant } from "../controller/restaurant.controller.js";
import fileUpload from "../middleware/multer.middleware.js";

const router = Router();

router.post("/", verifyJWt, verifySeller, fileUpload ,addNewRestaurant);
router.get("/", verifyJWt, fetchRestaurant);

export default router;