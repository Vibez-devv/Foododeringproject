const express = require("express");
const cors = require("cors");

const authRoute = require("./src/routes/authRoute");
const foodRoute = require("./src/routes/foodRoute");
const restaurantRoute = require("./src/routes/restaurantRoute");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Ordering API is running...");
});

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);
app.use("/api/restaurant", restaurantRoute);
module.exports = app;