import express from "express";

const router = express.Router();
import { login, logout, signup } from "../controllers/auth.js";
import { logRequestDetails, requestRateLimiter } from "../middlewares/commonWare.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/login", requestRateLimiter, logRequestDetails, login);
router.get("/logout", isAuthenticated, logout);
router.post("/signup", signup);

export default router;
