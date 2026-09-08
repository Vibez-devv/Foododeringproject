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
      !price ||
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

    res.status(201).json({
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Foods
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json({
      foods,
    });
  } catch (error) {
    res.status(500).json({
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

    res.status(200).json({
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addFood,
  getAllFoods,
  getFoodById,
};