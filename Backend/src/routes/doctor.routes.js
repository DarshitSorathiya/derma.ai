import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  register,
  login,
  logout,
  deleteAccount,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
} from "../controllers/general.controller.js";

import {
  toggleDoctorAvailability,
  getDoctorAppointments,
} from "../controllers/doctor.controller.js";

const router = Router();

router.route("/register").post(register("doctor"));

router.route("/login").post(login("doctor"));

router.route("/logout").post(verifyJWT, logout("doctor"));

router.route("/refresh-token").post(refreshAccessToken("doctor"));

router
  .route("/change-password")
  .post(verifyJWT, changeCurrentPassword("doctor"));

router.route("/update-account").post(verifyJWT, updateAccountDetails("doctor"));

router
  .route("/delete-account/:doctorId")
  .post(verifyJWT, deleteAccount("doctor"));

router.route("/toggle-availability").post(toggleDoctorAvailability);

router.route("/get-appointment").get(getDoctorAppointments);

export default router;
