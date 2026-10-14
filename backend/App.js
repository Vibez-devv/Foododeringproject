const express = require("express");
const cors = require("cors");

const authRoute = require("./src/routes/authRoute");
const foodRoute = require("./src/routes/foodRoute");
const restaurantRoute = require("./src/routes/restaurantRoute");
const paymentRoute = require("./src/routes/paymentRoute");
const orderRoute = require("./src/routes/orderRoute");
const reviewRoute = require("./src/routes/reviewRoute");

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://foododeringproject.vercel.app",
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked this origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// API health check
app.get("/", (req, res) => {
  res.send("Food Ordering API is running...");
});

// API routes
app.use("/api/auth", authRoute);
app.use("/api/food", foodRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);

module.exports = app;