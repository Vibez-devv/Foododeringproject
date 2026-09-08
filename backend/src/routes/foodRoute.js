const express = require("express");

const {
  addFood,
  getAllFoods,
  getFoodById,
} = require("../controllers/foodController");

const router = express.Router();

// Add food
router.post("/add", addFood);

// Get all foods
router.get("/all", getAllFoods);

// Get one food
router.get("/:id", getFoodById);

module.exports = router;