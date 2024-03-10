import express from "express";

const router = express.Router();
import { removeGarbage } from "../controllers/Garbage.js";

// security needs to be implemented on this route
router.delete("/delete", removeGarbage);

export default router;
