import React, { useState } from "react";
import { FaMapMarkerAlt, FaCreditCard, FaLock } from "react-icons/fa";
import { useCart } from "../contexts/Cartcontext";
import "./Checkout.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("delivery");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = 1000;
  const total = subtotal + deliveryFee;

 const handlePlaceOrder = () => {
  const placedOrder = {
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),

    total: cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),

    status: "Order Confirmed",
  };

  
  localStorage.setItem(
    "placedOrder",
    JSON.stringify(placedOrder)
  );

  
  navigate("/track-order");
};

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          <form onSubmit={handlePlaceOrder}>
            {/* DELIVERY INFORMATION */}
            <section className="checkout-section">
              <h2>
                <FaMapMarkerAlt />
                Delivery Information
              </h2>

              <div className="input-row">
                <input type="text" placeholder="First Name" required />

                <input type="text" placeholder="Last Name" required />
              </div>

              <input
                type="text"
                placeholder="Delivery Address"
                className="full-input"
                required
              />

              <div className="input-row">
                <input type="text" placeholder="City" required />

                <input type="tel" placeholder="Phone Number" required />
              </div>
            </section>

            {/* PAYMENT */}
            <section className="checkout-section">
              <h2>
                <FaCreditCard />
                Payment Method
              </h2>

              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="delivery"
                    checked={paymentMethod === "delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Pay on Delivery
                </label>

                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Card Payment
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="card-inputs">
                  <input type="text" placeholder="Card Number" required />

                  <div className="input-row">
                    <input type="text" placeholder="MM/YY" required />

                    <input type="text" placeholder="CVV" required />
                  </div>
                </div>
              )}

              <Link to="/track-order" className="place-order-btn">
                <i className="fa-solid fa-lock"></i>
                Place Order
              </Link>
            </section>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="checkout-items">
              {cartItems.length === 0 ? (
                <p className="empty-checkout">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div className="checkout-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        {item.quantity} × ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
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
  );
}

export default Checkout;
