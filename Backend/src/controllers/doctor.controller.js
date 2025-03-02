import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Doctor } from "../models/doctor.model.js";
import { Appointment } from "../models/appointment.model.js";

const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;

  const appointments = await Appointment.find({ doctorId }).populate(
    "doctorId",
    "name email"
  );

  if (!appointments) throw new ApiError(400, "No appointment booked");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "Doctor's appointments fetched successfully"
      )
    );
});

const toggleDoctorAvailability = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const { isAvailable } = req.body;

  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    { isAvailable },
    { new: true }
  );

  if (!doctor) throw new ApiError(404, "Doctor not found");

  return res
    .status(200)
    .json(
      new ApiResponse(200, doctor, "Doctor availability updated successfully")
    );
});



export { toggleDoctorAvailability, getDoctorAppointments };
