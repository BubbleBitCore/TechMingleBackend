import express from "express";

const router = express.Router();
import { getAllSessions,getUser } from "../controllers/Users.js";

router.get("/getSessions", getAllSessions);
router.get("/me",  getUser);


export default router;
