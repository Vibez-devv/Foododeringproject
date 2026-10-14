const express = require("express");

const {
  createReview,
  getRestaurantReviews,
} = require("../controllers/reviewController");

const protect = require("../middleware/auth");

const router = express.Router();

// Submit a review (logged-in customers only)
router.post("/", protect, createReview);

// Get reviews and ratings for a restaurant
router.get("/restaurant/:restaurantId", getRestaurantReviews);

module.exports = router;