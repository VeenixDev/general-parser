import { Router } from "express";
import userRoutes from "./userRoutes";

const router = Router();

router.get("/{user}", userRoutes);

export default router;
