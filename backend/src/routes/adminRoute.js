const express = require("express");

const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const {
  getDashboardStats,
} = require("../controllers/adminController");

const router = express.Router();

// Only authenticated administrators can access dashboard statistics.
router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;