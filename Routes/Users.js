import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
import {
  deleteSession,
  getAllSessions,
  getUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  deleteAllSessions,
} from "../controllers/Users.js";
import { requestRateLimiter } from "../middlewares/commonWare.js";

router.delete("/deleteUser/:userId", isAuthenticated, deleteUser);

router.delete("/deleteSession", isAuthenticated, deleteSession);
router.delete("/deleteAllSessions", deleteAllSessions);
router.get("/getSessions", isAuthenticated, getAllSessions);
router.get("/me", isAuthenticated, getUser);
router.get("/resetPassword",requestRateLimiter, resetPassword);
router.get("/forgotPassword", forgotPassword);

export default router;
