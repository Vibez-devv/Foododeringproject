const express = require("express");
const axios = require("axios");

const router = express.Router();

// Test payment route
router.get("/test", (req, res) => {
  res.json({
    message: "Payment route is working",
  });
});

// Verify Paystack payment
router.post("/verify", async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({
      message: "Payment reference is required",
    });
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return res.status(500).json({
      message: "Paystack secret key is not configured",
    });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = response.data?.data;

    // Make sure Paystack actually says the payment succeeded
    if (!paymentData || paymentData.status !== "success") {
      return res.status(400).json({
        message: "Payment was not successful",
        status: paymentData?.status || "unknown",
      });
    }

    // Make sure this is a Nigerian Naira transaction
    if (paymentData.currency !== "NGN") {
      return res.status(400).json({
        message: "Invalid payment currency",
      });
    }

    res.status(200).json({
      message: "Payment verified successfully",
      data: {
        status: paymentData.status,
        reference: paymentData.reference,
        amount: paymentData.amount,
        currency: paymentData.currency,
        email: paymentData.customer?.email,
      },
    });
  } catch (error) {
    console.error(
      "Paystack verification error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Payment verification failed",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;