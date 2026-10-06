const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get one order by ID
router.get("/:id", getOrderById);

module.exports = router;