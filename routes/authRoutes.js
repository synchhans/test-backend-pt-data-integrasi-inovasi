import express from "express";
import dotenv from "dotenv";
import { loginUser, registerUser } from "../controllers/authController.js";

dotenv.config();

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUser);

export default authRoutes;
