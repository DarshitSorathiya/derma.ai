import { Router } from "express";

import {
  register,
  login,
  logout,
  deleteAccount,
  changeCurrentPassword,
  updateAccountDetails,
  refreshAccessToken,
} from "../controllers/general.controller.js";

import { addHospitals } from "../controllers/hospital.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register("manager"));

router.route("/login").post(login("manager"));

router.route("/logout").post(verifyJWT("manager"), logout("manager"));

router.route("/refresh-token").post(refreshAccessToken("manager"));

router
  .route("/change-password")
  .post(verifyJWT("manager"), changeCurrentPassword("manager"));

router
  .route("/update-account")
  .post(verifyJWT("manager"), updateAccountDetails("manager"));

router
  .route("/delete-account/:managerId")
  .post(verifyJWT, deleteAccount("manager"));

router.route("/add-hospitals/:_id").post(verifyJWT("manager"), addHospitals);

export default router;
