import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SkinDisease } from "../models/skinDisease.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadImage = asyncHandler(async (req, res) => {
  const { userId } = req.user._id;

  if (!userId) throw new ApiError(400, "User not logged in");

  const skinImagePath = req.file?.skinImage[0]?.path;

  if (!skinImagePath) throw new ApiError(400, "Image Required");

  const skinImage = await uploadOnCloudinary(skinImagePath);

  const skinDisease = await SkinDisease.create({
    userId,
    skinImage: skinImagePath,
  });

  const newSkinDisease = SkinDisease.findById(skinDisease._id);

  if (!newSkinDisease)
    throw new ApiError(400, "Something went wrong while upload image");

  return res
    .status(200)
    .json(new ApiResponse(200, "Skin Uploaded successfully"));
});

export { uploadImage };
