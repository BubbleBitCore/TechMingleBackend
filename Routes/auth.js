import express from "express";

const router = express.Router();
import { login, logout, signup } from "../controllers/auth.js";
import { requestRateLimiter } from "../middlewares/commonWare.js";

router.post("/login",requestRateLimiter, login);
router.get("/logout", logout);
router.post("/signup", signup);

export default router;
