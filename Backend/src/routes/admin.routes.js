import { Router } from "express";

import {
  approveDoctor,
  approvePharmacist,
  getAllUsers,
  deleteUser,
} from "../controllers/admin.controller.js";

import {
  register,
  login,
  logout,
  deleteAccount,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
} from "../controllers/general.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(register("admin"));

router.route("/login").post(login("admin"));

router.route("/logout").post(verifyJWT("admin"), logout("admin"));

router.route("/refresh-token").post(refreshAccessToken("admin"));

router
  .route("/change-password")
  .post(verifyJWT("admin"), changeCurrentPassword("admin"));

router
  .route("/update-account")
  .post(verifyJWT("admin"), updateAccountDetails("admin"));

router
  .route("/delete-account/:adminId")
  .post(verifyJWT, deleteAccount("admin"));

router.route("/users").get(verifyJWT("admin"), getAllUsers);

router.route("/users/:_id").delete(verifyJWT("admin"), deleteUser);

router.route("/approve-doctors/:_id").post(verifyJWT("admin"), approveDoctor);

router.route(
  "/approve-pharmacist/:_id").post(
    verifyJWT("admin"),
    approvePharmacist
  );

export default router;
