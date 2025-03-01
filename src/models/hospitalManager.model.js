import mongoose from "mongoose";
import validator from "validator";

const hospitalManagerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  fullname: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    validate: [validator.isEmail, "Email formate is not valid"],
  },
  password: {
    type: String,
    required: [true, "Password must required"],
  },
  phoneNo: {
    type: String,
    validate: {
      validator: (v) => {
        return /^[0-9]{10}$/.test(v);
      },
      message: "Doctor's number is not valid",
    },
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  hospitalsManaged: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
});

hospitalManagerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const HospitalManager = mongoose.model(
  "HospitalManager",
  hospitalManagerSchema
);
