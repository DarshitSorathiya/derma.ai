import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SkinDisease } from "../models/skinDisease.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const uploadImage = asyncHandler(async (req, res) => {
  const { userId } = req.user._id;

  if (!userId) throw new ApiError(400, "User not logged in");

  const skinImagePath = req.file?.skinImage[0]?.path;

  if (!skinImagePath) throw new ApiError(400, "Image Required");

  const skinImage = await uploadOnCloudinary(skinImagePath);

  const skinDisease = await SkinDisease.create({
    userId,
    skinImage: skinImage.url,
  });

  const newSkinDisease = SkinDisease.findById(skinDisease._id);

  if (!newSkinDisease)
    throw new ApiError(400, "Something went wrong while upload image");

  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { balance: 10 } },
    { new: true }
  );

  if (!user) throw new ApiError(400, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Skin Uploaded successfully"));
});

const generateWeeklyReport = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const pastWeekAnalysis = await SkinDisease.find({
    userId,
    date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  });

  if (!pastWeekAnalysis.length)
    throw new ApiError(404, "No data for the past week");

  return res
    .status(200)
    .json(new ApiResponse(200, pastWeekAnalysis, "Weekly report generated"));
});



export { uploadImage, generateWeeklyReport };
