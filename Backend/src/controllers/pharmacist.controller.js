import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Medicine } from "../models/medicine.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addMedicine = asyncHandler(async (req, res) => {
  const { name, description, price, stock, manufacturer, discount } = req.body;

  if (!name || !price || !stock) {
    throw new ApiError(400, "Name, price, and stock are required");
  }

  let images = [];

  if (req.files && req.files.length > 0) {
    for (let file of req.files) {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        images.push(result.secure_url);
      }
      fs.unlinkSync(file.path);
    }
  }

  const newMedicine = await Medicine.create({
    name,
    description,
    price,
    stock,
    manufacturer,
    discount,
    addedBy: req.user?._id,
    images,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newMedicine, "Medicine added successfully"));
});

export { addMedicine };
