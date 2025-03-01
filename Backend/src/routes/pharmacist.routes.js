import { Router } from "express";

import {
  register,
  login,
  logout,
  deleteAccount,
  changeCurrentPassword,
  updateAccountDetails,
  refreshAccessToken
} from "../controllers/general.controller.js";

import { addMedicine } from "../controllers/pharmacist.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register("pharmacist"));

router.route("/login").post(login("pharmacist"));

router.route("/logout").post(verifyJWT("pharmacist"), logout("pharmacist"));

router.route("/refresh-token").post(refreshAccessToken("pharmacist"));

router
  .route("/change-password")
  .post(verifyJWT("pharmacist"), changeCurrentPassword("pharmacist"));

router
  .route("/update-account")
  .post(verifyJWT("pharmacist"), updateAccountDetails("pharmacist"));

router
  .route("/delete-account/:pharmacistId")
  .post(verifyJWT, deleteAccount("pharmacist"));

router.route("/add-medicines/:_id").post(verifyJWT("pharmacist"), addMedicine);

export default router