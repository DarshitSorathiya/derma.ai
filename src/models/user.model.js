import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
      validate: [validator.isEmail, "Email format is not valid"],
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future.",
      },
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    age: { type: Number, default: 0 },

    password: {
      type: String,
      required: [true, "Password must required"],
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const today = new Date();

  this.age = today.getFullYear() - this.dob.getFullYear();

  if (
    today.getMonth() < this.dob.getMonth() ||
    (today.getMonth() === this.dob.getMonth() &&
      today.getDay() < this.dob.getDay())
  ) {
    this.age--;
  }

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);
