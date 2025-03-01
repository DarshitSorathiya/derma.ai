import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { Medicine } from "../models/medicine.model.js";
import { initiatePayment, processRefund } from "./payment.controller.js";

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { items, totalAmount, paymentMethod, cardNumber, expiryDate } =
    req.body;

  if (!items || items.length === 0)
    throw new ApiError(400, "Order items cannot be empty");

  for (const item in items) {
    const medicine = await Medicine.findById(item.medicineId);

    if (!medicine)
      throw new ApiError(400, `medicine ${item.medicineId} not found`);

    if (medicine.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${medicine.name}`);
    }
  }

  const order = new Order({
    userId,
    items,
    totalAmount,
    paymentMethod,
    status: "Pending",
  });

  await order.save();

  const paymentResponse = initiatePayment({
    body: {
      orderId: order._id,
      amount: totalAmount,
      paymentMethod,
      cardNumber,
      expiryDate,
    },
    user: { _id: userId },
    params: { paymentFor: "Order" },
  });
  if (!paymentResponse.success) {
    throw new ApiError(500, "Payment initiation failed");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        orderId: order._id,
        paymentOrderId: paymentResponse.orderId,
        amount: totalAmount,
      },
      "Order created successfully, complete payment to confirm"
    )
  );
});

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId)
    .populate("userId", "name email")
    .populate("items.productId", "name price");

  if (!order) throw new ApiError(404, "Order not found");

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order details fetched successfully"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  order.status = status;
  await order.save();

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user._id;

  const order = await Order.findOne({ _id: orderId, userId });

  if (!order) throw new ApiError(404, "Order not found");
  if (order.status === "Cancelled") {
    throw new ApiError(400, "Order already cancelled");
  }

  order.status = "Cancelled";
  await order.save();

  if (order.paymentStatus === "Completed") {
    processRefund({ body: { orderId: order._id }, res });
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Order cancelled successfully"));
});

export { createOrder, getOrders, getOrderById, updateOrderStatus, cancelOrder };
