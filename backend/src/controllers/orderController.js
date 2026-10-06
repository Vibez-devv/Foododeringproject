const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      items,
      customer,
      delivery,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentReference,
    } = req.body;

    // Validate required information
    if (
      !items ||
      items.length === 0 ||
      !customer ||
      !delivery ||
      subtotal == null ||
      total == null ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Please provide all required order information.",
      });
    }

    // Validate payment method
    if (!["paystack", "delivery"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method.",
      });
    }

    // Paystack orders must have a verified payment reference.
    // Verification will be connected securely in the next step.
    if (paymentMethod === "paystack" && !paymentReference) {
      return res.status(400).json({
        message: "A payment reference is required.",
      });
    }

    const order = await Order.create({
      items,
      customer,
      delivery,
      subtotal,
      deliveryFee: deliveryFee ?? 1000,
      total,
      paymentMethod,
      paymentReference: paymentReference || "",
      paymentStatus:
        paymentMethod === "paystack" ? "Paid" : "Pending",
      status: "Order Confirmed",
    });

    return res.status(201).json({
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Unable to create order.",
      error: error.message,
    });
  }
};

// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      message: "Unable to retrieve orders.",
    });
  }
};

// GET ONE ORDER
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    return res.status(200).json({ order });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid order ID.",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};