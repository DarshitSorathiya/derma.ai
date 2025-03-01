import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { initiatePayment, processRefund } from "./payment.controller.js";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Hospital } from "../models/hospital.model.js";
import { Payment } from "../models/payment.model.js";

const bookAppointment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(400, "User not logged in");

  const {
    doctorId,
    hospitalId,
    AppointmentDate,
    AppointmentTime,
    amount,
    paymentMethod,
    cardNumber,
    expiryDate,
  } = req.body;

  const { AppointmentFor } = req.params;

  if (
    !(
      AppointmentFor &&
      AppointmentDate &&
      AppointmentTime &&
      amount &&
      paymentMethod &&
      cardNumber &&
      expiryDate
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  let isAvailable = false;

  if (AppointmentFor === "Telemedicine") {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) throw new ApiError(404, "Doctor not found");

    isAvailable = doctor.availableTimings.some(
      (slot) => slot.date === AppointmentDate && slot.time === AppointmentTime
    );

    if (!isAvailable) {
      throw new ApiError(400, "Selected date & time is not available");
    }

    doctor.availableTimings = doctor.availableTimings.filter(
      (slot) =>
        !(slot.date === AppointmentDate && slot.time === AppointmentTime)
    );

    await doctor.save();
  } else if (AppointmentFor === "Physical") {
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    const isAlreadyBooked = hospital.bookedSlots.some(
      (slot) => slot.date === AppointmentDate && slot.time === AppointmentTime
    );

    if (isAlreadyBooked) {
      throw new ApiError(400, "Selected date & time is already booked");
    }

    hospital.bookedSlots.push({ date: AppointmentDate, time: AppointmentTime });
    await hospital.save();
  }

  const existingAppointment = await Appointment.findOne({
    doctorId,
    AppointmentDate,
    AppointmentTime,
  });

  if (existingAppointment) {
    throw new ApiError(400, "This slot is already booked");
  }

  // Step 1: Create a new appointment (status = "Pending")
  const appointment = new Appointment({
    userId,
    doctorId: AppointmentFor === "Telemedicine" ? doctorId : null,
    hospitalId: AppointmentFor === "Physical" ? hospitalId : null,
    AppointmentDate,
    AppointmentTime,
    AppointmentFor,
    status: "Pending",
  });
  await appointment.save();

  // Step 2: Generate a Razorpay order for payment
  const paymentResponse = initiatePayment({
    body: {
      appointmentId: appointment._id,
      amount,
      paymentMethod,
      cardNumber,
      expiryDate,
    },
    user: { _id: userId },
    params: { paymentFor: "Appointment" },
  });

  if (!paymentResponse.success) {
    throw new ApiError(500, "Payment order creation failed");
  }

  // Step 3: Send response with payment details
  res.status(201).json(
    new ApiResponse(
      201,
      {
        appointmentId: appointment._id,
        orderId: paymentResponse.orderId,
        amount,
      },
      "Appointment booked, complete payment to confirm"
    )
  );
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const userId = req.user._id; // Fixed destructuring issue

  const appointment = await Appointment.findOne({ _id: appointmentId, userId });

  if (!appointment) throw new ApiError(404, "Appointment not found");

  if (appointment.status === "Cancelled") {
    throw new ApiError(400, "Appointment already cancelled");
  }

  appointment.status = "Cancelled";
  await appointment.save();

  const payment = await Payment.findOne({ appointmentId });
  if (payment && payment.status === "Completed") {
    await processRefund({ body: { orderId: payment.orderId }, res });
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Appointment cancelled successfully"));
});

const getUserAppointments = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) throw new ApiError(400, "User not logged in");

  const appointments = await Appointment.find({ userId })
    .populate("doctorId", "name specialization")
    .populate("hospitalId", "name location");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        appointments,
        "User appointments fetched successfully"
      )
    );
});

export { bookAppointment, cancelAppointment, getUserAppointments };
