const express = require("express");

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/create", createRestaurant);

router.get("/all", getAllRestaurants);

router.get("/:id", getRestaurantById);

module.exports = router;