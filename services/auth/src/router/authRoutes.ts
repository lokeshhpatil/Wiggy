import { Router } from "express";
import { getProfile, updateUserRole, userLogin } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login",userLogin);
//update user role
router.put("/add/role",verifyJWT,updateUserRole);
//fetch user profile
router.get("/profile", verifyJWT, getProfile);

export default router;