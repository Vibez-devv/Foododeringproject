import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ManageFoods.css";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://foododeringproject.onrender.com/api"
).replace(/\/+$/, "");

function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  // Safely handle JSON and HTML responses
  const requestAPI = async (url, options = {}) => {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();

      throw new Error(
        `The server returned a non-JSON response (HTTP ${response.status}). ` +
          `Check the backend URL and ensure the latest backend routes are deployed.`
      );
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  };

  // Fetch real food items from MongoDB
  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await requestAPI(`${API_URL}/food/all`);

      setFoods(Array.isArray(data.foods) ? data.foods : []);
    } catch (err) {
      console.error("Failed to load foods:", err);
      setError(err.message || "Could not load food items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Update food availability
  const toggleAvailability = async (food) => {
    const url = `${API_URL}/food/${food._id}/availability`;

    try {
      setActionLoading(food._id);
      console.log("Availability endpoint:", url);

      const data = await requestAPI(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          available: !food.available,
        }),
      });

      // Use the updated food returned by the backend
      const updatedFood = data.food;

      setFoods((previousFoods) =>
        previousFoods.map((item) =>
          item._id === food._id
            ? updatedFood || {
                ...item,
                available: !food.available,
              }
            : item
        )
      );
    } catch (err) {
      console.error("Availability update failed:", err);
      alert(err.message);
    } finally {
      setActionLoading("");
    }
  };

  // Delete food permanently from MongoDB
  const deleteFood = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this food?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);

      await requestAPI(`${API_URL}/food/${id}`, {
        method: "DELETE",
      });

      setFoods((previousFoods) =>
        previousFoods.filter((food) => food._id !== id)
      );

      alert("Food deleted successfully.");
    } catch (err) {
      console.error("Food deletion failed:", err);
      alert(err.message);
    } finally {
      setActionLoading("");
    }
  };

  return (
    <div className="manage-foods-page">
      <Navbar />

      <main className="manage-foods-container">
        <div className="manage-foods-header">
          <div>
            <h1>
              <i className="fa-solid fa-utensils"></i> Manage Foods
            </h1>

            <p>Manage your restaurant menu and food availability.</p>
          </div>

          <a href="/add-food" className="add-new-food-btn">
            <i className="fa-solid fa-plus"></i> Add Food
          </a>
        </div>

        {loading ? (
          <div className="foods-message">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading your food items...</p>
          </div>
        ) : error ? (
          <div className="foods-message error-message">
            <i className="fa-solid fa-circle-exclamation"></i>
            <h2>Could not load food items</h2>
            <p>{error}</p>

            <button onClick={fetchFoods}>Try Again</button>
          </div>
        ) : foods.length === 0 ? (
          <div className="foods-message">
            <i className="fa-solid fa-utensils"></i>
            <h2>No food items yet</h2>
            <p>
              Food items you add through Add Food will appear here
              automatically.
            </p>

            <a href="/add-food" className="add-new-food-btn">
              <i className="fa-solid fa-plus"></i> Add Your First Food
            </a>
          </div>
        ) : (
          <>
            <div className="foods-count">
              Total food items: <strong>{foods.length}</strong>
            </div>

            <div className="foods-grid">
              {foods.map((food) => (
                <article
                  className="food-management-card"
                  key={food._id}
                >
                  <div className="food-image">
                    {food.image ? (
                      <img
                        src={food.image}
                        alt={food.foodName}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <i className="fa-solid fa-utensils"></i>
                    )}
                  </div>

                  <div className="food-info">
                    <div className="food-title">
                      <h2>{food.foodName}</h2>

                      <span
                        className={
                          food.available ? "available" : "unavailable"
                        }
                      >
                        {food.available ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <p className="food-description">
                      {food.description}
                    </p>

                    <p className="food-category">
                      <i className="fa-solid fa-list"></i>{" "}
                      {food.category}
                    </p>

                    <h3>
                      ₦{Number(food.price).toLocaleString("en-NG")}
                    </h3>

                    <div className="food-actions">
                      <button
                        className="availability-btn"
                        disabled={actionLoading === food._id}
                        onClick={() => toggleAvailability(food)}
                      >
                        <i className="fa-solid fa-toggle-on"></i>{" "}
                        {actionLoading === food._id
                          ? "Please wait..."
                          : food.available
                            ? "Mark Unavailable"
                            : "Mark Available"}
                      </button>

                      <button
                        className="delete-food-btn"
                        disabled={actionLoading === food._id}
                        onClick={() => deleteFood(food._id)}
                      >
                        <i className="fa-solid fa-trash"></i>{" "}
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ManageFoods;