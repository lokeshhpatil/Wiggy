import { Router } from "express";
import { getProfile, googleLogin, updateUserRole, userLogin } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login",userLogin); //Manual login
router.post("/login-google", googleLogin); //google login
router.put("/add-role",verifyJWT,updateUserRole); //Update user
router.get("/profile", verifyJWT, getProfile); //Fetch user

export default router;