import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
import {
  deleteSession,
  getAllSessions,
  getUser,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
  deleteAllSessions,
  followRequest,
  getFollowers,
  getFollowings,
} from "../controllers/Users.js";
import { requestRateLimiter } from "../middlewares/commonWare.js";

router.delete("/deleteUser/:userId", isAuthenticated, deleteUser);
router.patch("/updateUser/:userId", isAuthenticated, updateUser);

router.post("/follow", isAuthenticated, followRequest);
router.get("/getfollowers", isAuthenticated, getFollowers);
router.get("/getfollowings", isAuthenticated, getFollowings);

router.delete("/deleteSession", isAuthenticated, deleteSession);
router.delete("/deleteAllSessions", deleteAllSessions);
router.get("/getSessions", isAuthenticated, getAllSessions);
router.get("/me", isAuthenticated, getUser);
router.get("/resetPassword", requestRateLimiter, resetPassword);
router.get("/forgotPassword", forgotPassword);

export default router;
