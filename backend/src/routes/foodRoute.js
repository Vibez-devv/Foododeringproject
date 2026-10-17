const express = require("express");

const {
  addFood,
  getAllFoods,
  getFoodById,
  updateFoodAvailability,
  deleteFood,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/add", addFood);

router.get("/all", getAllFoods);

router.patch("/:id/availability", updateFoodAvailability);

router.delete("/:id", deleteFood);

router.get("/:id", getFoodById);

module.exports = router;