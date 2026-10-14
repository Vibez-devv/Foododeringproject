const mongoose = require("mongoose");
const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
const User = require("../models/User");

// Submit a restaurant review
const createReview = async (req, res) => {
  try {
    const { restaurantId, rating, comment } = req.body;
    const userId = req.user.id;

    // Validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({
        message: "Invalid restaurant ID.",
      });
    }

    // Validate rating
    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5 stars.",
      });
    }

    // Validate comment
    if (
      typeof comment !== "string" ||
      comment.trim().length < 3 ||
      comment.trim().length > 1000
    ) {
      return res.status(400).json({
        message: "Review must be between 3 and 1000 characters.",
      });
    }

    // Check restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found.",
      });
    }

    // Check that the customer has a delivered order
    const deliveredOrders = await Order.find({
      userId,
      status: "Delivered",
    });

    // Check whether any order contains food from this restaurant
    const hasOrderedFromRestaurant = deliveredOrders.some((order) =>
      order.items.some(
        (item) =>
          item.restaurantId &&
          item.restaurantId.toString() === restaurantId.toString()
      )
    );

    if (!hasOrderedFromRestaurant) {
      return res.status(403).json({
        message:
          "You can review this restaurant only after an order has been delivered.",
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      userId,
      restaurantId,
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this restaurant.",
      });
    }

    // Get customer name
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Customer account not found.",
      });
    }

    const customerName =
      user.name || user.firstName || "Customer";

    // Save review
    const review = await Review.create({
      userId,
      restaurantId,
      customerName,
      rating: numericRating,
      comment: comment.trim(),
    });

    // Recalculate restaurant average rating
    const result = await Review.aggregate([
      {
        $match: {
          restaurantId: new mongoose.Types.ObjectId(restaurantId),
        },
      },
      {
        $group: {
          _id: "$restaurantId",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRating =
      result.length > 0
        ? Number(result[0].averageRating.toFixed(1))
        : 0;

    await Restaurant.findByIdAndUpdate(restaurantId, {
      rating: averageRating,
    });

    return res.status(201).json({
      message: "Review submitted successfully.",
      review,
      averageRating,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already reviewed this restaurant.",
      });
    }

    console.error("Create review error:", error);

    return res.status(500).json({
      message: "Unable to submit review.",
    });
  }
};

// Get reviews for a restaurant
const getRestaurantReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({
        message: "Invalid restaurant ID.",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found.",
      });
    }

    const reviews = await Review.find({ restaurantId })
      .sort({ createdAt: -1 })
      .select("customerName rating comment createdAt");

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : Number(
            (
              reviews.reduce(
                (sum, review) => sum + review.rating,
                0
              ) / totalReviews
            ).toFixed(1)
          );

    return res.status(200).json({
      restaurantId,
      totalReviews,
      averageRating,
      reviews,
    });
  } catch (error) {
    console.error("Get restaurant reviews error:", error);

    return res.status(500).json({
      message: "Unable to retrieve reviews.",
    });
  }
};

module.exports = {
  createReview,
  getRestaurantReviews,
};