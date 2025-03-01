import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentFor: {
      type: String,
      enum: ["Appointment", "Medicine"],
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: function () {
        return this.paymentFor === "Appointment";
      },
    },
    medicineOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: function () {
        return this.paymentFor === "Medicine";
      },
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    orderId: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Card", "UPI", "Net Banking", "Wallet"],
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },

    cardDetails: {
      cardNumber: {
        type: String,
        required: function () {
          return this.paymentMethod === "Card";
        },
      },
      expiryDate: {
        type: String, // MM/YY format
        required: function () {
          return this.paymentMethod === "Card";
        },
      },
    },
    
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
