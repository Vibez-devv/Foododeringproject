import React, { useState } from "react";
import { FaMapMarkerAlt, FaLock, FaCreditCard } from "react-icons/fa";
import { useCart } from "../contexts/Cartcontext";
import { useNavigate } from "react-router-dom";
import Paystack from "@paystack/inline-js";
import "./Checkout.css";

function Checkout() {
  const { cartItems, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos",
  });

  const deliveryFee = 1000;
  const subtotal = cartTotal;
  const total = subtotal + deliveryFee;

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.address.trim() &&
    formData.city.trim();

  const createOrder = async (paymentStatus, paymentReference = "") => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/orders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items: cartItems.map((item) => ({
            foodId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),

          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },

          delivery: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
          },

          subtotal,
          deliveryFee,
          total,

          paymentMethod,
          paymentStatus,
          paymentReference,
        }),
      });

      const result = await response.json();

      console.log("Order response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to create order");
      }

      // Keep the order locally for the tracking page
      localStorage.setItem("placedOrder", JSON.stringify(result.order));

      clearCart();

      navigate("/track-order");
    } catch (error) {
      console.error("Create order error:", error);

      alert(error.message || "Something went wrong while creating your order.");
    } finally {
      setLoading(false);
    }
  };

  // Verify payment with our backend
  const verifyPayment = async (reference) => {
    try {
      const response = await fetch("https://foododeringproject.onrender.com/api/payment/verify", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refernce,
          expectedAmount: total * 100,
        }),
      });

      const result = await response.json();

      console.log("Paystack verification:", result);

      if (!response.ok || result?.data?.status !== "success") {
        throw new Error(result?.message || "Payment verification failed");
      }

      createOrder("Paid", reference);
    } catch (error) {
      console.error(error);

      alert(
        "Payment was completed, but we could not verify it. Please contact support.",
      );

      setLoading(false);
    }
  };

  // Start Paystack
  const handlePaystackPayment = () => {
    if (!isFormValid) {
      alert("Please complete all delivery information first.");
      return;
    }

    if (!publicKey) {
      alert("Paystack public key is missing. Check your frontend .env file.");
      return;
    }

    setLoading(true);

    const paystack = new Paystack();

    paystack.checkout({
      key: publicKey,

      email: formData.email,

      amount: total * 100,

      currency: "NGN",

      channels: ["card", "bank", "ussd", "bank_transfer"],

      metadata: {
        customer_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        delivery_address: formData.address,
        city: formData.city,
      },

      onSuccess: (transaction) => {
        console.log("Paystack payment successful:", transaction);

        verifyPayment(transaction.reference);
      },

      onCancel: () => {
        console.log("Paystack payment cancelled.");

        setLoading(false);

        alert("Payment was cancelled.");
      },
    });
  };

  // Pay on delivery
  const handlePayOnDelivery = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please complete all delivery information.");
      return;
    }

    createOrder("Pending");
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>

          <p>Add some food before checking out.</p>

          <button onClick={() => navigate("/restaurants")}>
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>

          <p>Complete your order and choose your payment method.</p>
        </div>

        <div className="checkout-content">
          {/* DELIVERY INFORMATION */}

          <div className="checkout-left">
            <div className="checkout-card">
              <div className="section-title">
                <FaMapMarkerAlt />

                <h2>Delivery Information</h2>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08012345678"
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Lagos"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Lagos"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT */}

            <div className="checkout-card">
              <div className="section-title">
                <FaCreditCard />

                <h2>Payment Method</h2>
              </div>

              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="paystack"
                    checked={paymentMethod === "paystack"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <div>
                    <strong>Pay with Paystack</strong>

                    <p>Card, bank transfer, USSD and more</p>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="delivery"
                    checked={paymentMethod === "delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <div>
                    <strong>Pay on Delivery</strong>

                    <p>Pay when your food arrives</p>
                  </div>
                </label>
              </div>

              {paymentMethod === "paystack" && (
                <div className="paystack-section">
                  <div className="secure-payment">
                    <FaLock />

                    <span>Secure payment powered by Paystack</span>
                  </div>

                  <button
                    type="button"
                    className="paystack-button"
                    onClick={handlePaystackPayment}
                    disabled={!isFormValid || loading}
                  >
                    <FaCreditCard />

                    {loading
                      ? "Processing Payment..."
                      : `Pay ₦${total.toLocaleString()}`}
                  </button>
                </div>
              )}

              {paymentMethod === "delivery" && (
                <form onSubmit={handlePayOnDelivery}>
                  <button
                    type="submit"
                    className="place-order-button"
                    disabled={!isFormValid}
                  >
                    <FaLock />
                    Place Order
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div className="checkout-right">
            <div className="checkout-card order-summary">
              <h2>Order Summary</h2>

              <div className="summary-items">
                {cartItems.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="summary-item-info">
                      <h3>{item.name}</h3>

                      <p>
                        {item.quantity} × ₦{item.price.toLocaleString()}
                      </p>
                    </div>

                    <strong>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="summary-line">
                <span>Subtotal</span>

                <strong>₦{subtotal.toLocaleString()}</strong>
              </div>

              <div className="summary-line">
                <span>Delivery Fee</span>

                <strong>₦{deliveryFee.toLocaleString()}</strong>
              </div>

              <div className="summary-total">
                <span>Total</span>

                <strong>₦{total.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
