import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Payment } from "../models/payment.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Order } from "../models/order.model.js";
import { gateway } from "../config/braintree.config.js";

const initiatePayment = asyncHandler(async (req, res) => {
  const {
    appointmentId,
    medicineOrderId,
    amount,
    currency,
    paymentMethod,
    nonce, // Braintree-specific payment nonce
  } = req.body;

  const { paymentFor } = req.params;
  const userId = req.user._id;

  if (!["Appointment", "Medicine"].includes(paymentFor)) {
    throw new ApiError(400, "Invalid Payment Type");
  }

  if (
    paymentFor === "Appointment" &&
    !(await Appointment.findById(appointmentId))
  ) {
    return res.status(404).json({ error: "Appointment not found" });
  }
  if (paymentFor === "Medicine" && !(await Order.findById(medicineOrderId))) {
    return res.status(404).json({ error: "Medicine order not found" });
  }

  const saleRequest = {
    amount,
    paymentMethodNonce: nonce, // Nonce generated from the frontend
    options: { submitForSettlement: true },
  };

  const result = await gateway.transaction.sale(saleRequest);

  if (!result.success) {
    throw new ApiError(500, "Payment initiation failed");
  }

  const payment = new Payment({
    userId,
    paymentFor,
    appointmentId: paymentFor === "Appointment" ? appointmentId : null,
    medicineOrderId: paymentFor === "Medicine" ? medicineOrderId : null,
    amount,
    currency: currency || "USD",
    orderId: result.transaction.id,
    status: "Pending",
    paymentMethod,
  });

  await payment.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        transactionId: result.transaction.id,
        amount,
        currency: result.transaction.currencyIsoCode,
      },
      "Payment initiated successfully"
    )
  );
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { transactionId } = req.body;

  if (!transactionId) {
    throw new ApiError(400, "Invalid payment verification data");
  }

  const transaction = await gateway.transaction.find(transactionId);

  if (
    transaction.status !== "settled" &&
    transaction.status !== "submitted_for_settlement"
  ) {
    throw new ApiError(400, "Payment not completed");
  }

  const payment = await Payment.findOneAndUpdate(
    { orderId: transactionId },
    { status: "Completed" }
  );

  await payment.save();

  await Appointment.findByIdAndUpdate(payment.appointmentId, {
    status: "Confirmed",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Payment verified successfully"));
});

const processRefund = asyncHandler(async (req, res) => {
  const { transactionId } = req.body;

  const payment = await Payment.findOne({ orderId: transactionId });

  if (!payment || payment.status !== "Completed") {
    throw new ApiError(400, "Invalid or incomplete payment");
  }

  const refundResult = await gateway.transaction.refund(transactionId);

  if (!refundResult.success) {
    throw new ApiError(500, "Refund failed");
  }

  payment.status = "Refunded";
  await payment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, refundResult, "Refund processed successfully"));
});

export { initiatePayment, verifyPayment, processRefund };
