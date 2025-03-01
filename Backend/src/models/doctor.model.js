import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import validator from "validator";

const doctorSchema = new mongoose.Schema(
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
      validate: [validator.isEmail, "Email formate is not valid"],
    },
    password: {
      type: String,
      required: [true, "Password must required"],
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
    availableTimings: [
      {
        date: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
    isAvailable: { type: Boolean, default: true },

    certificate: {
      type: String,
      required: true, 
    },
    
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

doctorSchema.plugin(mongooseAggregatePaginate);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
