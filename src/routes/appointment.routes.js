import { Router } from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUserAppointments,
} from "../controllers/appointment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/book/:AppointmentFor", verifyJWT, bookAppointment);

router.post("/cancel/:appointmentId", verifyJWT, cancelAppointment);

router.get("/getappointments", verifyJWT, getUserAppointments);

export default router;
