import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SkinDisease } from "../models/skinDisease.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("skinImage");

const runMLModel = (imagePath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      "C:/Users/Darshit/Downloads/skin_disease_model.py",
      imagePath,
    ]);

    let result = "";
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`ML Model Error: ${data}`);
      reject(data.toString());
    });

    pythonProcess.on("close", () => {
      try {
        resolve(JSON.parse(result));
      } catch (error) {
        reject("Error parsing ML model output.");
      }
    });
  });
};

const uploadImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) throw new ApiError(400, "User not logged in");

  const skinImagePath = req.file?.path;
  if (!skinImagePath) throw new ApiError(400, "Image Required");

  const skinImage = await uploadOnCloudinary(skinImagePath);

  const skinDisease = await SkinDisease.create({
    userId,
    skinImage: skinImage.url,
  });

  const newSkinDisease = await SkinDisease.findById(skinDisease._id);
  if (!newSkinDisease)
    throw new ApiError(400, "Something went wrong while uploading image");

  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { balance: 10 } },
    { new: true }
  );
  if (!user) throw new ApiError(400, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Skin Image Uploaded Successfully"));
});

const predictSkinDisease = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "File upload failed" });
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    try {
      const { userId } = req.body;
      const imagePath = req.file.path;

      const mlResult = await runMLModel(imagePath);

      const newEntry = new SkinDisease({
        userId,
        skinImage: imagePath,
        predictedDisease: mlResult.predictedDisease,
        confidence: mlResult.confidence,
        ayurvedicRemedies: mlResult.ayurvedicRemedies,
        medicalAdvice: mlResult.medicalAdvice,
      });

      await newEntry.save();

      res.status(200).json({
        message: "Prediction saved successfully",
        data: newEntry,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

const generateWeeklyReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const pastWeekAnalysis = await SkinDisease.find({
    userId,
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  }).sort({ createdAt: -1 });

  if (!pastWeekAnalysis.length)
    throw new ApiError(404, "No data for the past week");

  return res
    .status(200)
    .json(new ApiResponse(200, pastWeekAnalysis, "Weekly report generated"));
});

const getUserReports = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await SkinDisease.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  uploadImage,
  generateWeeklyReport,
  predictSkinDisease,
  getUserReports,
};
