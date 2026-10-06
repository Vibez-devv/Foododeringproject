const express = require("express");
const cors = require("cors");


// const paymentRoute = require("./routes/paymentRoute");
const authRoute = require("./src/routes/authRoute");
const foodRoute = require("./src/routes/foodRoute");
const restaurantRoute = require("./src/routes/restaurantRoute");
const paymentRoute = require("./src/routes/paymentRoute");
const orderRoute = require("./src/routes/orderRoute")
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Ordering API is running...");
});

app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);
app.use("/api/restaurant", restaurantRoute);

app.use("/api/payment", paymentRoute);
app.use("/api/orders", orderRoute);
module.exports = app;