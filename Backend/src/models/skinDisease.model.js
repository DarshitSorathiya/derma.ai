import mongoose from "mongoose";

const skinDiseaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skinImage: {
      type: String,
      required: true,
    },

    predictedDisease: { type: String },

    confidence: { type: Number },

    ayurvedicRemedies: { type: [String] },

    medicalAdvice: { type: [String] },

  },
  { timestamps: true }
);

export const SkinDisease = mongoose.model("SkinDisease", skinDiseaseSchema);
