import mongoose from "mongoose";
import validator from "validator";

const doctorRequestSchema = new mongoose.Schema({
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
    validate: [validator.isEmail, "Email formate is not valid"],
  },
  speciality: {
    type: String,
    required: true,
  },
  experience: [
    {
      type: String,
      required: true,
    },
  ],
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
  certificate: {
    type: String,
    required: true,
  },
});

const DoctorRequest = mongoose.model("DoctorRequest", doctorRequestSchema);

const pharmacistRequestSchema = mongoose.Schema({
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
  address: [
    {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https:\/\/www\.google\.com\/maps\/.*/.test(v);
        },
        message: "Invalid Google Maps URL",
      },
    },
  ],
  certificate: {
    type: String,
    required: true,
  },
});

const PharmacistRequest = mongoose.model(
  "PharmacistRequest",
  pharmacistRequestSchema
);

export { DoctorRequest, PharmacistRequest };
