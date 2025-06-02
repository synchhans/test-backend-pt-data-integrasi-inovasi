import express from "express";
import {
  createDoctor,
  getAllDoctors,
} from "../controllers/doctorController.js";
import authenticateToken from "../middleware/auth.js";

const doctorRoutes = express.Router();

doctorRoutes.post("/doctors", authenticateToken, createDoctor);

doctorRoutes.get("/doctors", authenticateToken, getAllDoctors);

export default doctorRoutes;
