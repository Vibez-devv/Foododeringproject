const Restaurant = require("../models/Restaurant");

// Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    const {
      restaurantName,
      owner,
      email,
      phone,
      address,
      image,
    } = req.body;

    if (
      !restaurantName ||
      !owner ||
      !email ||
      !phone ||
      !address
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const restaurant = await Restaurant.create({
      restaurantName,
      owner,
      email,
      phone,
      address,
      image,
    });

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get One Restaurant
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate("owner", "name email");

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
};