import express from "express";
import {
  createSchedule,
  getSchedules,
} from "../controllers/scheduleController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/schedules", authenticateToken, createSchedule);
router.get("/schedules", getSchedules);

export default router;