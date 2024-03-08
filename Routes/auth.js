import express from "express";

const router = express.Router();
import { login, logout, signup, verifyUser } from "../controllers/auth.js";
import {
  logRequestDetails,
  requestRateLimiter,
} from "../middlewares/commonWare.js";

router.post("/login", requestRateLimiter, logRequestDetails, login);
router.get("/logout", logout);
router.post("/signup", signup);
router.post("/verifyUser", verifyUser);

export default router;
