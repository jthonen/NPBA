import express from "express";
import userRoutes from "./users"

const router = express.Router();

// Book routes
router.use("/users", userRoutes);

export default router;