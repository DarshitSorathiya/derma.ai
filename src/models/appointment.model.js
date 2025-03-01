import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    AppointmentFor: {
      type: String,
      enum: ["Physical", "Telemedicine"],
      required: true,
    },

    HospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: function () {
        return this.AppointmentFor === "Physical";
      },
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: function () {
        return this.AppointmentFor === "Telemedicine";
      },
    },

    appointmentDate: {
      type: Date,
      validate: {
        validator: (date) => {
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return date >= tomorrow;
        },
        message: "Appointment date must be from tomorrow",
      },
    },

    appointmentTime: {
      type: String,
      required: true,
      validate: {
        validator: (time) => /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/.test(time),
        message: "Invalid time format (HH:MM)",
      },
    },
    
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
