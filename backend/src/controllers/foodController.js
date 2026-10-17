const Food = require("../models/Food");

// Add Food
const addFood = async (req, res) => {
  try {
    const {
      foodName,
      description,
      price,
      category,
      image,
      restaurantId,
    } = req.body;

    if (
      !foodName ||
      !description ||
      price === undefined ||
      price === null ||
      price === "" ||
      !category ||
      !restaurantId
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const food = await Food.create({
      foodName,
      description,
      price,
      category,
      image,
      restaurantId,
    });

    return res.status(201).json({
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get One Food
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update Food Availability
const updateFoodAvailability = async (req, res) => {
  try {
    const { available } = req.body;

    if (typeof available !== "boolean") {
      return res.status(400).json({
        message: "Please provide a valid availability status",
      });
    }

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    return res.status(200).json({
      message: "Food availability updated successfully",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Food
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    return res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addFood,
  getAllFoods,
  getFoodById,
  updateFoodAvailability,
  deleteFood,
};