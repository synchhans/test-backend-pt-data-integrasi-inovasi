import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api", scheduleRoutes);
app.use("/api", authRoutes);
app.use("/api", doctorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
