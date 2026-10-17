import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AdminDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (response.status === 403) {
          setError("Access denied. This page is for administrators only.");
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load dashboard statistics."
          );
        }

        setStats(data.stats);
        setRecentOrders(data.recentOrders || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const formatCurrency = (amount) =>
    `₦${Number(amount || 0).toLocaleString("en-NG")}`;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const dashboardCards = stats
    ? [
        {
          title: "Total Users",
          value: stats.totalUsers,
          icon: "fa-users",
          color: "blue",
          link: "/manage-users",
        },
        {
          title: "Restaurants",
          value: stats.totalRestaurants,
          icon: "fa-store",
          color: "purple",
          link: "/manage-restaurants",
        },
        {
          title: "Food Items",
          value: stats.totalFoods,
          icon: "fa-utensils",
          color: "orange",
          link: "/manage-foods",
        },
        {
          title: "Total Orders",
          value: stats.totalOrders,
          icon: "fa-receipt",
          color: "green",
          link: "/manage-orders",
        },
        {
          title: "Pending Orders",
          value: stats.pendingOrders,
          icon: "fa-clock",
          color: "yellow",
          link: "/manage-orders",
        },
        {
          title: "Delivered Orders",
          value: stats.deliveredOrders,
          icon: "fa-check-circle",
          color: "teal",
          link: "/manage-orders",
        },
        {
          title: "Cancelled Orders",
          value: stats.cancelledOrders,
          icon: "fa-ban",
          color: "red",
          link: "/manage-orders",
        },
        {
          title: "Total Sales",
          value: formatCurrency(stats.totalSales),
          icon: "fa-wallet",
          color: "dark",
          link: "/manage-orders",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <Navbar />
        <div className="admin-loading">
          <i className="fa-solid fa-spinner fa-spin"></i>
          <p>Loading admin dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-page">
        <Navbar />
        <div className="admin-error">
          <i className="fa-solid fa-lock"></i>
          <h2>Unable to open dashboard</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>Return Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <Navbar />

      <main className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <div>
            <span className="admin-eyebrow">ADMINISTRATION</span>
            <h1>Admin Dashboard</h1>
            <p>
              Welcome to VibezFoodHub. Manage your users, restaurants,
              food and orders from one place.
            </p>
          </div>

          <button
            className="admin-refresh-btn"
            onClick={() => window.location.reload()}
          >
            <i className="fa-solid fa-rotate"></i> Refresh
          </button>
        </div>

        <section className="admin-stats-grid">
          {dashboardCards.map((card) => (
            <Link
              to={card.link}
              className="admin-stat-card"
              key={card.title}
            >
              <div className={`admin-stat-icon ${card.color}`}>
                <i className={`fa-solid ${card.icon}`}></i>
              </div>

              <div className="admin-stat-details">
                <p>{card.title}</p>
                <h2>{card.value}</h2>
              </div>

              <i className="fa-solid fa-arrow-up-right-from-square admin-card-arrow"></i>
            </Link>
          ))}
        </section>

        <section className="admin-management-section">
          <div className="admin-section-heading">
            <div>
              <h2>Management Centre</h2>
              <p>Quick access to your administration tools.</p>
            </div>
          </div>

          <div className="admin-management-grid">
            <Link to="/manage-users" className="admin-management-card">
              <i className="fa-solid fa-users"></i>
              <h3>Manage Users</h3>
              <p>View and manage registered accounts.</p>
              <span>
                Open Users <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>

            <Link
              to="/manage-restaurants"
              className="admin-management-card"
            >
              <i className="fa-solid fa-store"></i>
              <h3>Manage Restaurants</h3>
              <p>Manage restaurants and their details.</p>
              <span>
                Open Restaurants <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>

            <Link to="/manage-foods" className="admin-management-card">
              <i className="fa-solid fa-utensils"></i>
              <h3>Manage Foods</h3>
              <p>Review food listings and availability.</p>
              <span>
                Open Foods <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>

            <Link to="/manage-orders" className="admin-management-card">
              <i className="fa-solid fa-receipt"></i>
              <h3>Manage Orders</h3>
              <p>Review orders and their current status.</p>
              <span>
                Open Orders <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </section>

        <section className="admin-recent-section">
          <div className="admin-section-heading">
            <div>
              <h2>Recent Orders</h2>
              <p>The latest orders recorded in your database.</p>
            </div>

            <Link to="/manage-orders" className="admin-view-all">
              View All
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="admin-empty-orders">
              <i className="fa-solid fa-receipt"></i>
              <h3>No orders yet</h3>
              <p>Orders will appear here when customers place them.</p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-orders-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Order Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        {order.customer
                          ? `${order.customer.firstName} ${order.customer.lastName}`
                          : "Customer"}
                      </td>
                      <td>{formatCurrency(order.total)}</td>
                      <td>{order.paymentStatus}</td>
                      <td>
                        <span className="admin-order-status">
                          {order.status}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;