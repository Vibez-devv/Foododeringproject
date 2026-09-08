import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ManageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John",
      restaurant: "Pizza Palace",
      amount: 8500,
      status: "Preparing",
    },
    {
      id: 2,
      customer: "Sarah",
      restaurant: "Burger House",
      amount: 5500,
      status: "On The Way",
    },
    {
      id: 3,
      customer: "David",
      restaurant: "FoodHub",
      amount: 7200,
      status: "Delivered",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div className="manage-orders-page">
      <Navbar />

      <div className="manage-orders-container">
        <div className="manage-orders-header">
          <h1>
            <i className="fa-solid fa-box"></i>
            Manage Orders
          </h1>

          <p>Manage all customer orders.</p>
        </div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h2>Order #{order.id}</h2>

              <p>Customer: {order.customer}</p>

              <p>Restaurant: {order.restaurant}</p>

              <p>
                Amount: ₦
                {order.amount.toLocaleString()}
              </p>

              <p>Status: {order.status}</p>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order.id,
                    e.target.value
                  )
                }
              >
                <option>Preparing</option>

                <option>Cooking</option>

                <option>On The Way</option>

                <option>Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ManageOrders;