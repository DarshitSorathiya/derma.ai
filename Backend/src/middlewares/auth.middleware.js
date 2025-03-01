import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { HospitalManager } from "../models/hospitalManager.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Admin } from "../models/admin.model.js";
import { Pharmacist } from "../models/pharmacist.model.js";

const schemas = {
  user: User,
  manager: HospitalManager,
  admin: Admin,
  doctor: Doctor,
  pharmacist: Pharmacist,
};

const verifyJWT = (Type = "user") =>
  asyncHandler(async (req, _, next) => {
    try {
      const Schema = schemas[Type];
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Baerer ", " ");

      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const schema = await Schema.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!schema) {
        throw new ApiError(403, `Access denied! Not a ${Type}`);
      }

      req.user = schema;
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Access Token is not varified");
    }
  });

export { verifyJWT };
