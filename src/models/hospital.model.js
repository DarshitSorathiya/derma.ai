import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const hospitalSchema = new mongoose.Schema(
  {
    hospitalname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https:\/\/www\.google\.com\/maps\/.*/.test(v);
        },
        message: "Invalid Google Maps URL",
      },
    },
    contact: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Hospital's Contact no is not in valid format",
      },
    },
    workingHours: {
      type: String,
      required: true,
    },
    bookedSlots: [
      {
        date: { type: String, required: true },
        time: { type: String, required: true },
      },
    ],
    addedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "HospitalManager" }],
  },
  { timestamps: true }
);

hospitalSchema.plugin(mongooseAggregatePaginate);

export const Hospital = mongoose.model("Hospital", hospitalSchema);
