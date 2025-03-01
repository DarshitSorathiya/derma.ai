import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctor.model.js";

const getAvailableDoctors = asyncHandler(async (req, res) => {
  const { speciality, experience } = req.query;

  let filter = { isAvailable: true };

  if (speciality) filter.speciality = speciality;
  if (experience) filter.experience = { $gte: Number(experience) };

  const doctors = await Doctor.find(filter).select(
    "name specialization availableTimings"
  );

  if (!doctors.length) throw new ApiError(404, "No available doctors found");

  return res
    .status(200)
    .json(
      new ApiResponse(200, doctors, "Available doctors fetched successfully")
    );
});

const scheduleVideoConsultation = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) throw new ApiError(400, "User not logged in");

  const {
    doctorId,
    appointmentDate,
    appointmentTime,
    amount,
    paymentMethod,
    cardDetails,
  } = req.body;

  if (!(doctorId && appointmentDate && appointmentTime && amount)) {
    throw new ApiError(400, "All fields are required");
  }

  const doctor = await Doctor.findById(doctorId);

  if (!doctor) throw new ApiError(400, "Doctor not available");

  const isAvailable = doctor.availableTimings.some(
    (slot) => slot.date === appointmentDate && slot.time === appointmentTime
  );

  if (!isAvailable)
    throw new ApiError(400, "Selected time slot is unavailable");

  const existingAppointment = await Appointment.findOne({
    doctorId,
    appointmentDate,
    appointmentTime,
  });

  if (existingAppointment)
    throw new ApiError(400, "This slot is already booked");

  // Create a new appointment (status = "Pending")
  const appointment = new Appointment({
    userId,
    doctorId,
    appointmentDate,
    appointmentTime,
    appointmentType: "Telemedicine",
    status: "Pending",
  });
  await appointment.save();

  // Initiate payment
  const paymentResponse = await initiatePayment({
    body: {
      appointmentId: appointment._id,
      amount,
      paymentMethod,
      ...cardDetails,
    },
    user: { _id: userId },
    params: { paymentFor: "Telemedicine Appointment" },
  });

  if (!paymentResponse.success) {
    throw new ApiError(500, "Payment order creation failed");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        appointmentId: appointment._id,
        orderId: paymentResponse.orderId,
        amount,
      },
      "Video consultation scheduled, complete payment to confirm"
    )
  );
});

const getUserTelemedicineAppointments = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(401, "User not logged in");

  const appointments = await Appointment.find({
    userId,
    appointmentType: "Telemedicine",
  }).populate("doctorId", "name specialization");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "User's telemedicine appointments fetched successfully"
      )
    );
});

export {
  getAvailableDoctors,
  scheduleVideoConsultation,
  getUserTelemedicineAppointments,
};
