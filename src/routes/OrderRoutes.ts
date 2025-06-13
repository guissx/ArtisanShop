import { Router } from "express";
import { createOrder } from "../controllers/order.controller";
import { authenticateToken } from "../middlewares/authmiddlewares";

const router = Router();

router.post("/orders", authenticateToken, createOrder);

export default router;
