import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";
import { User } from "../models/user.model.js";
import { Hospital } from "../models/hospital.model.js";
import { Doctor } from "../models/doctor.model.js";

const isPasswordCorrect = async (password, enteredPassword) => {
  if (!password) {
    throw new Error("Password field is missing");
  }
  return await bcrypt.compare(password, enteredPassword);
};

const generateAccessToken = (database) => {
  return jwt.sign(
    {
      _id: database._id,
      username: database.username,
      email: database.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = (database) => {
  return jwt.sign(
    {
      _id: database._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const generateAccessAndRefreshToken = async (schemaType , Id) => {
  try {
    const schemas = {
      user: User,
      hospital: Hospital,
      doctor: Doctor,
    };

    const Schema = schemas[schemaType];
    if (!Schema) throw new ApiError(400, `Invalid schema type: ${schemaType}`);

    const schema = await Schema.findById(Id);
    if (!schema) throw new ApiError(400, `ID ${Id} does not exist in database`);

    const accessToken = generateAccessToken(schema);
    const refreshToken = generateRefreshToken(schema);

    schema.refreshToken = refreshToken;
    await schema.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

export { isPasswordCorrect, generateAccessAndRefreshToken };
