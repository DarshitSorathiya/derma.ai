import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const telemedicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    availableDates: {
      type: Date,
      required: true,
    },

    availableTimeSlots: [
      {
        type: String,
        required: true,
      },
    ],

    videoCallLink: { type: String },
  },
  { timestamps: true }
);

telemedicineSchema.plugin(mongooseAggregatePaginate);

export const Telemedicine = mongoose.model("Telemedicine", telemedicineSchema);
