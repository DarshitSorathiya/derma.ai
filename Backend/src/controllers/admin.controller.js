import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { DoctorRequest } from "../models/request.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Pharmacist } from "../models/pharmacist.model.js";
import { generateRandomPassword } from "../utils/randomPassword.js";
import { sendEmail } from "../utils/sendEmail.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Fetching all users"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params?._id);
  if (!user) throw new ApiError(400, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

const approveDoctor = asyncHandler(async (req, res) => {
  if (req.body.flag) {
    const request = DoctorRequest.findById(req.params._id);
    if (!request) throw new ApiError(404, "Request not found");

    const approvedDoctor = await Doctor.findById(req.params?._id);
    if (approvedDoctor) throw new ApiError(400, "Doctor is already approved");

    const randomPassword = generateRandomPassword();

    const doctor = new Doctor({
      username: request.username,
      fullname: request.fullname,
      email: request.email,
      password: randomPassword,
      phoneNo: request.phoneNo,
      gender: request.gender,
      speciality: request.speciality,
      experience: request.experience,
      availableTimings: request.availableTimings,
    });

    await doctor.save();

     sendEmail(
      doctor.email,
      "Your Account is Approved",
      `Your account has been approved. Your temporary password is: ${randomPassword}. Please change it after login.`
    );
  }

  await DoctorRequest.findByIdAndDelete(req.params._id);

  return res.status(200).json(200, doctor, "Doctor Approved");
});

const approvePharmacist = asyncHandler(async (req, res) => {
  if (req.body.flag) {
    const request = DoctorRequest.findById(req.params._id);
    if (!request) throw new ApiError(404, "Request not found");

    const approvedPharmacist = await Doctor.findById(req.params?._id);
    if (approvedPharmacist)
      throw new ApiError(400, "Pharmacist is already approved");

    const randomPassword = generateRandomPassword();

    const pharmacist = new Pharmacist({
      username: request.username,
      fullname: request.fullname,
      email: request.email,
      password: randomPassword,
      phoneNo: request.phoneNo,
      gender: request.gender,
      certificate: request.certificate,
    });

    await pharmacist.save();

    await sendEmail(
      pharmacist.email,
      "Your Account is Approved",
      `Your account has been approved. Your temporary password is: ${randomPassword}. Please change it after login.`
    );
  }
  await DoctorRequest.findByIdAndDelete(req.params._id);

  return res.status(200).json(200, pharmacist, "Doctor Approved");
});

export { approveDoctor, approvePharmacist, getAllUsers, deleteUser };
