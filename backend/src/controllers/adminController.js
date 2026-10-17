const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");
const Order = require("../models/Order");

// GET ADMIN DASHBOARD STATISTICS
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalRestaurants,
      totalFoods,
      totalOrders,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      paidOrders,
      recentOrders,
    ] = await Promise.all([
      User.countDocuments(),
      Restaurant.countDocuments(),
      Food.countDocuments(),
      Order.countDocuments(),

      Order.countDocuments({
        status: "Order Confirmed",
      }),

      Order.countDocuments({
        status: "Delivered",
      }),

      Order.countDocuments({
        status: "Cancelled",
      }),

      Order.find({
        paymentStatus: "Paid",
      }).select("total"),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("customer total status paymentStatus createdAt"),
    ]);

    const totalSales = paidOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    return res.status(200).json({
      message: "Admin dashboard statistics retrieved successfully",
      stats: {
        totalUsers,
        totalRestaurants,
        totalFoods,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        cancelledOrders,
        totalSales,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      message: "Failed to load admin dashboard statistics.",
    });
  }
};

module.exports = {
  getDashboardStats,
};