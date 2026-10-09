import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No login token found.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load orders"
          );
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error(
          "Fetch orders error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <h1>My Orders</h1>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>
            View your previous food orders and
            payment details.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <FaBox />
            <h2>No orders yet</h2>
            <p>
              Your completed orders will appear here.
            </p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >
                <div className="order-card-header">
                  <div>
                    <h2>
                      Order #
                      {order._id.slice(-6)}
                    </h2>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`order-status ${order.status
                      ?.toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map(
                    (item, index) => (
                      <div
                        className="order-item"
                        key={`${order._id}-${index}`}
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                          />
                        )}

                        <div className="order-item-info">
                          <h3>{item.name}</h3>

                          <p>
                            {item.quantity} × ₦
                            {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="order-details">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ₦
                      {order.subtotal?.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Delivery</span>
                    <strong>
                      ₦
                      {order.deliveryFee?.toLocaleString()}
                    </strong>
                  </div>

                  <div className="order-total">
                    <span>Total</span>
                    <strong>
                      ₦
                      {order.total?.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="order-payment">
                  <div>
                    <FaCreditCard />

                    <span>
                      {order.paymentMethod ===
                      "paystack"
                        ? "Paystack"
                        : "Pay on Delivery"}
                    </span>
                  </div>

                  <span
                    className={`payment-status ${order.paymentStatus?.toLowerCase()}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="order-delivery">
                  <FaTruck />

                  <div>
                    <strong>
                      Delivery Address
                    </strong>

                    <p>
                      {order.delivery?.address},{" "}
                      {order.delivery?.city},{" "}
                      {order.delivery?.state}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;