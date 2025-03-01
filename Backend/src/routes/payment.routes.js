import { Router } from "express";
import {
  initiatePayment,
  verifyPayment,
  processRefund,
} from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/initiate", verifyJWT, initiatePayment);

router.post("/verify", verifyJWT, verifyPayment);

router.post("/refund", verifyJWT, processRefund);

export default router;
