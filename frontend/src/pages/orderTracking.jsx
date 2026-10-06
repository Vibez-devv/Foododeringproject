import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderTracking.css";

function OrderTracking() {
  const statuses = [
    "Order Confirmed",
    "Preparing Your Food",
    "Out for Delivery",
    "Delivered",
  ];

  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem("placedOrder");

    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  const [statusIndex, setStatusIndex] = useState(() => {
    const savedOrder = localStorage.getItem("placedOrder");

    if (!savedOrder) {
      return 0;
    }

    const saved = JSON.parse(savedOrder);

    const index = statuses.indexOf(saved.status);

    return index >= 0 ? index : 0;
  });

  const orderItems = order?.items || [];

  const currentStatus = statuses[statusIndex];


  /* ================================
     AUTOMATIC STATUS UPDATE
  ================================= */

  useEffect(() => {
    if (!order) return;

    if (statusIndex >= statuses.length - 1) {
      return;
    }

    const timer = setInterval(() => {
      setStatusIndex((previousIndex) => {

        const nextIndex = previousIndex + 1;

        if (nextIndex >= statuses.length) {
          return previousIndex;
        }

        const updatedOrder = {
          ...order,
          status: statuses[nextIndex],
        };

        localStorage.setItem(
          "placedOrder",
          JSON.stringify(updatedOrder)
        );

        setOrder(updatedOrder);

        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(timer);

  }, [order, statusIndex]);


  /* ================================
     STATUS MESSAGE
  ================================= */

  const getStatusMessage = () => {

    switch (currentStatus) {

      case "Order Confirmed":
        return "Your order has been received successfully.";

      case "Preparing Your Food":
        return "The restaurant is currently preparing your meal.";

      case "Out for Delivery":
        return "Your food is on the way to your location.";

      case "Delivered":
        return "Your order has arrived. Enjoy your meal!";

      default:
        return "Your order is being processed.";
    }
  };


  return (
    <div className="tracking-page">

      <Navbar />

      <main className="tracking-container">

        {/* HEADER */}

        <div className="tracking-header">

          <span className="tracking-label">
            <i className="fa-solid fa-location-dot"></i>
            ORDER TRACKING
          </span>

          <h1>Track Your Order</h1>

          <p>
            Follow your order from the restaurant to your doorstep.
          </p>

        </div>


        {/* CURRENT STATUS */}

        <div className="order-status">

          <div className="status-icon">

            <i className="fa-solid fa-check"></i>

          </div>

          <div className="status-content">

            <span>Current Status</span>

            <h2>{currentStatus}</h2>

            <p>{getStatusMessage()}</p>

          </div>

        </div>


        {/* DELIVERY STATUS */}

        <div className="delivery-status">

          <div className="delivery-header">

            <div>

              <span>ORDER PROGRESS</span>

              <h2>
                <i className="fa-solid fa-truck"></i>
                Delivery Status
              </h2>

            </div>

            <div className="progress-number">
              {statusIndex + 1}/4
            </div>

          </div>


          <div className="tracking-timeline">


            {/* ORDER CONFIRMED */}

            <div
              className={`status-step ${
                statusIndex >= 0 ? "active" : ""
              }`}
            >

              <div className="step-icon">

                <i className="fa-solid fa-circle-check"></i>

              </div>

              <div className="step-content">

                <h3>Order Confirmed</h3>

                <p>
                  Your order has been received.
                </p>

              </div>

            </div>


            {/* PREPARING */}

            <div
              className={`status-step ${
                statusIndex >= 1 ? "active" : ""
              }`}
            >

              <div className="step-icon">

                <i className="fa-solid fa-utensils"></i>

              </div>

              <div className="step-content">

                <h3>Preparing Your Food</h3>

                <p>
                  The restaurant is preparing your meal.
                </p>

              </div>

            </div>


            {/* OUT FOR DELIVERY */}

            <div
              className={`status-step ${
                statusIndex >= 2 ? "active" : ""
              }`}
            >

              <div className="step-icon">

                <i className="fa-solid fa-motorcycle"></i>

              </div>

              <div className="step-content">

                <h3>Out for Delivery</h3>

                <p>
                  Your rider is bringing your food to you.
                </p>

              </div>

            </div>


            {/* DELIVERED */}

            <div
              className={`status-step ${
                statusIndex >= 3 ? "active" : ""
              }`}
            >

              <div className="step-icon">

                <i className="fa-solid fa-house"></i>

              </div>

              <div className="step-content">

                <h3>Delivered</h3>

                <p>
                  Your food has arrived.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ORDER DETAILS */}

        <div className="order-details">

          <div className="order-details-header">

            <div>

              <span>YOUR PURCHASE</span>

              <h2>Order Details</h2>

            </div>

            <span className="item-count">

              {orderItems.length}{" "}

              {orderItems.length === 1
                ? "Item"
                : "Items"}

            </span>

          </div>


          {orderItems.length === 0 ? (

            <div className="empty-order">

              <div className="empty-order-icon">

                <i className="fa-solid fa-cart-shopping"></i>

              </div>

              <h3>No order found</h3>

              <p>
                You have not placed an order yet.
              </p>

              <a href="/restaurants">
                Browse Restaurants
              </a>

            </div>

          ) : (

            <div className="order-items">

              {orderItems.map((item, index) => (

                <div
                  className="order-item"
                  key={`${item.id}-${index}`}
                >

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
                      {Number(item.price).toLocaleString()}
                    </p>

                  </div>

                  <strong>
                    ₦
                    {(
                      Number(item.price) *
                      (item.quantity || 1)
                    ).toLocaleString()}
                  </strong>

                </div>

              ))}

            </div>

          )}


          {/* TOTAL */}

          {orderItems.length > 0 && (

            <div className="order-total">

              <span>Total Amount</span>

              <strong>
                ₦
                {Number(
                  order?.total || 0
                ).toLocaleString()}
              </strong>

            </div>

          )}

        </div>


        {/* TRACKING NOTICE */}

        <div className="tracking-notice">

          <div className="notice-icon">

            <i className="fa-solid fa-location-crosshairs"></i>

          </div>

          <div>

            <h3>Delivery Tracking</h3>

            <p>
              Your order status is being updated as
              your order moves through each delivery stage.
            </p>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default OrderTracking;