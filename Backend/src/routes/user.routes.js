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

const router = Router();

router.route("/register").post(register("user"));

router.route("/login").post(login("user"));

router.route("/logout").post(verifyJWT, logout("user"));

router.route("/refresh-token").post(refreshAccessToken("user"));

router.route("/change-password").post(verifyJWT, changeCurrentPassword("user"));

router.route("/update-account").post(verifyJWT, updateAccountDetails("user"));

router
  .route("/delete-account/:userId")
  .delete(verifyJWT, deleteAccount("user"));

export default router;
