import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        type: String,
        unique: true,
      },
    ],

    manufacturer: {
      type: String,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacist",
    },
    discount: { type: Number, min: [0, "Price cannot be negative"] },
  },
  { timestamps: true }
);

medicineSchema.plugin(mongooseAggregatePaginate);

export const Medicine = mongoose.model("Medicine", medicineSchema);
