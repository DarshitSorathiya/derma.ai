import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { HospitalManager } from "../models/hospitalManager.model.js";
import { Hospital } from "../models/hospital.model.js";

const addHospitals = asyncHandler(async (req, res) => {
  const { hospitalname, address, contact, workingHours } = req.body;
  const managerId = req.user._id;

  const manager = await HospitalManager.findById(managerId);

  if (!manager)
    throw new ApiError(
      400,
      "Access denied! Only hospital managers can add hospitals."
    );

  if (!/^https:\/\/www\.google\.com\/maps\/.*/.test(address)) {
    return res.status(400).json({ message: "Invalid Google Maps link" });
  }
  const hospital = new Hospital({
    hospitalname,
    address,
    contact,
    workingHours,
    addedBy: managerId,
  });
  await hospital.save();

  manager.hospitalsManaged.push(hospital._id);
  await manager.save();

  return res
    .status(201)
    .json(new ApiResponse(201, hospital, "Hospital added successfully."));
});

export { addHospitals };
