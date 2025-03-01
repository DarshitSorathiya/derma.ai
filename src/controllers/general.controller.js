import fs from "fs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import {
  isPasswordCorrect,
  generateAccessAndRefreshToken,
} from "../utils/databaseMethod.js";
import { HospitalManager } from "../models/hospitalManager.model.js";
import { Pharmacist } from "../models/pharmacist.model.js";
import { Admin } from "../models/admin.model.js";
import { DoctorRequest, PharmacistRequest } from "../models/request.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { SchemaType } from "mongoose";

const schemas = {
  user: User,
  hospitalManager: HospitalManager,
  doctor: Doctor,
  pharmacist: Pharmacist,
  admin: Admin,
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const register = (schemaType) =>
  asyncHandler(async (req, res) => {
    let Schema = schemas[schemaType];

    if (schemaType === "doctor") Schema = DoctorRequest;
    if (schemaType === "pharmacist") Schema = PharmacistRequest;

    const { fullname, email, password, phoneNo } = req.body;

    const username = req.body.username.toLowerCase();
    const gender = req.body.gender.toLowerCase();

    if (
      [username, fullname, email, password, gender, phoneNo].some(
        (field) => field?.trim() === ""
      ) &&
      Schema !== Admin
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existed = await Schema.findOne({
      $or: [{ username }, { email }],
    });

    if (existed) {
      throw new ApiError(400, "already exists Please try to log in");
    }

    let schemaData = {};

    switch (schemaType) {
      case "user": {
        const { password } = req.body;
        const dob = new Date(req.body.dob);
        schemaData = {
          username,
          fullname,
          email,
          password,
          phoneNo,
          gender,
          dob,
        };
        break;
      }

      case "doctor": {
        const { speciality, experience, availableTimings } = req.body;

        const certificatePath = req.file?.certificate[0]?.path;

        if (!certificatePath) throw new ApiError(400, "Image Required");

        const certificate = await uploadOnCloudinary(certificatePath);

        if (!certificate.url) {
          throw new ApiError(400, "Error while uploading on avatar");
        } else {
          fs.unlink(certificatePath, (err) => {
            if (err)
              throw new ApiError(
                400,
                "Error occured in deleting Avatar from local storage"
              );
            console.log("Avatar Deleted from local storage");
          });
        }

        if (!speciality || !experience || !availableTimings)
          throw new ApiError(400, "All fields are required");

        schemaData = {
          username,
          fullname,
          email,
          phoneNo,
          gender,
          speciality,
          experience,
          availableTimings,
          certificate: certificate.url,
        };

        break;
      }
      case "manager": {
        schemaData = {
          username,
          fullname,
          email,
          phoneNo,
          gender,
        };
        break;
      }

      case "pharmacist": {
        const address = req.body;

        const certificatePath = req.file?.certificate[0]?.path;

        if (!certificatePath) throw new ApiError(400, "Image Required");

        const certificate = await uploadOnCloudinary(certificatePath);

        if (!certificate.url) {
          throw new ApiError(400, "Error while uploading on certificate");
        } else {
          fs.unlink(certificatePath, (err) => {
            if (err)
              throw new ApiError(
                400,
                "Error occured in deleting Certificate from local storage"
              );
            console.log("Certificate Deleted from local storage");
          });
        }

        schemaData = {
          username,
          fullname,
          email,
          phoneNo,
          gender,
          address,
          certificate: certificate.url,
        };
        break;
      }

      case "admin": {
        const { password } = req.body;
        schemaData = {
          adminName: username,
          adminEmail: email,
          password: password,
        };
      }
      default:
        throw new ApiError(400, "Invalid schema type");
    }

    const schema = await Schema.create(schemaData);

    const created = await Schema.findById(schema._id).select(
      "-password -refreshToken"
    );

    if (!created) {
      throw new ApiError(
        500,
        `Something went wrong while registering the ${Schema}`
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, created, `${schemaType} registered successfully`)
      );
  });

const login = (schemaType) =>
  asyncHandler(async (req, res) => {
    const Schema = schemas[schemaType];
    const { username, email } = req.body;

    if (!(username || email)) {
      throw new ApiError(400, "Username or email must be required");
    }

    const schema = await Schema.findOne({
      $or: [{ username }, { email }],
    });

    if (!schema) {
      throw new ApiError(401, `${schemaType} does not exist`);
    }
    const isCorrect = await isPasswordCorrect(
      req.body.password,
      schema.password
    );

    if (!isCorrect) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      schemaType,
      schema._id
    );

    const loggedIn = await Schema.findById(schema._id)
      .select("-password -refreshToken")
      .lean();

    if (!loggedIn) {
      throw new ApiError(500, `Error fetching ${Schema} data`);
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { schema: loggedIn, accessToken, refreshToken },
          `${Schema} Logged In Successfully`
        )
      );
  });

const logout = (schemaType) =>
  asyncHandler(async (req, res) => {
    const Schema = schemas[schemaType];
    await Schema.findByIdAndUpdate(
      req.user._id,
      {
        $set: { refreshToken: undefined },
      },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, `${Schema} Logged Out`));
  });

const deleteAccount = (schemaType) =>
  asyncHandler(async (req, res) => {
    const Schema = schemas[schemaType];
    const { Id } = req.params;

    const schema = await Schema.findByIdAndDelete(Id);

    if (!schema) throw new ApiError(404, `${Schema} not found`);

    return res
      .status(200)
      .json(200, {}, `${Schema} details updated successfully`);
  });

const changeCurrentPassword = (schemaType) =>
  asyncHandler(async (req, res) => {
    const Schema = schemas[schemaType];

    const { oldPassword, newPassword, confPassword } = req.body;

    if (!(confPassword === newPassword))
      throw new ApiError(400, "New Password and confirm Password are not same");

    const schema = await Schema.findById(req.schema?._id);

    if (!schema) throw new ApiError(400, `${schemaType} does not exist`);

    const isPasswordCorrect = await isPasswordCorrect(
      oldPassword,
      schema.password
    );

    if (!isPasswordCorrect) throw new ApiError(400, "Password is not true");

    schema.password = newPassword;
    await schema.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  });

const updateAccountDetails = (schemaType) =>
  asyncHandler(async (req, res) => {
    const Schema = schemas[schemaType];
    const { fullname, phoneNo, email } = req.body;

    if (!fullname || !phoneNo || !email)
      throw new ApiError(400, "All fields cannot be empty");

    const schema = await Schema.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullname: fullname,
          phoneNo: phoneNo,
          email: email,
        },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(
        new ApiResponse(200, schema, "Account details updated successfully")
      );
  });

const refreshAccessToken = (schemaType) =>
  asyncHandler(async (req, res) => {
    try {
      const Schema = schemas[schemaType];

      const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

      if (!incomingRefreshToken)
        throw new ApiError(401, "Unauthorized request");

      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      const schema = await Schema.findById(decodedToken?._id);

      if (!schema) throw new ApiError(401, "Invalid refresh Token");

      if (incomingRefreshToken !== schema?.refreshToken)
        throw new ApiError(401, "Refresh Token is expired or in use");

      const { newAccessToken, newRefreshToken } =
        await generateAccessAndRefreshToken(schema._id);

      return res
        .status(200)
        .cookie("accessToken", newAccessToken, cookieOptions)
        .cookie("refreshToken", newRefreshToken, cookieOptions)
        .json(
          new ApiResponse(
            200,
            { accessToken: newAccessToken, refreshToken: newRefreshToken },
            "Access Token Refreshed"
          )
        );
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid Refresh Token");
    }
  });

export {
  register,
  login,
  logout,
  deleteAccount,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
};
