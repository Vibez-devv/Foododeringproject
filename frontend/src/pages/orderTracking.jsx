import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderTracking.css";

function OrderTracking() {
  const order = JSON.parse(localStorage.getItem("placedOrder"));

  const orderItems = order?.items || [];

  return (
    <div className="tracking-page">
      <Navbar />

      <div className="tracking-container">

        {/* PAGE TITLE */}
        <div className="tracking-header">
          <h1>Track Your Order</h1>

          <p>
            <i className="fa-solid fa-location-dot"></i>
            Your order is on its way
          </p>
        </div>

        {/* ORDER STATUS */}
        <div className="order-status">
          <div className="status-icon">
            <i className="fa-solid fa-check"></i>
          </div>

          <div>
            <h2>{order?.status || "Order Confirmed"}</h2>
            <p>Your order has been successfully placed.</p>
          </div>
        </div>

        {/* ORDER DETAILS */}
        <div className="order-details">

          <div className="order-details-header">
            <h2>Order Details</h2>

            <span>
              {orderItems.length}{" "}
              {orderItems.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {orderItems.length === 0 ? (
            <div className="empty-order">
              <i className="fa-solid fa-cart-shopping"></i>

              <h3>No order found</h3>

              <p>
                You have not placed an order yet.
              </p>
            </div>
          ) : (
            orderItems.map((item) => (
              <div className="order-item" key={item.id}>

                <div className="order-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="order-item-info">
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity || 1} × ₦
                    {item.price.toLocaleString()}
                  </p>
                </div>

                <strong>
                  ₦
                  {(
                    item.price * (item.quantity || 1)
                  ).toLocaleString()}
                </strong>

              </div>
            ))
          )}

          {/* TOTAL */}
          {orderItems.length > 0 && (
            <div className="order-total">
              <h2>Total</h2>

              <strong>
                ₦{order.total?.toLocaleString()}
              </strong>
            </div>
          )}

        </div>

        {/* DELIVERY STATUS */}
        <div className="delivery-status">

          <h2>
            <i className="fa-solid fa-truck"></i>
            Delivery Status
          </h2>

          <div className="status-step active">
            <i className="fa-solid fa-circle-check"></i>

            <div>
              <h3>Order Confirmed</h3>
              <p>Your order has been received.</p>
            </div>
          </div>

          <div className="status-step">
            <i className="fa-solid fa-utensils"></i>

            <div>
              <h3>Preparing Your Food</h3>
              <p>The restaurant is preparing your meal.</p>
            </div>
          </div>

          <div className="status-step">
            <i className="fa-solid fa-motorcycle"></i>

            <div>
              <h3>Out for Delivery</h3>
              <p>Your rider will bring your food to you.</p>
            </div>
          </div>

          <div className="status-step">
            <i className="fa-solid fa-house"></i>

            <div>
              <h3>Delivered</h3>
              <p>Your food has arrived.</p>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default OrderTracking;