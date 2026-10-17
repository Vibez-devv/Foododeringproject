import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeft,
  faStar,
  faClock,
  faTruck,
  faCartShopping,
  faPlus,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../contexts/Cartcontext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RestaurantReviews from "../components/RestaurantReviews";

import "./RestaurantDetails.css";

import food from "../assets/images/food.jpg";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foododeringproject.onrender.com/api";

function RestaurantDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [foodError, setFoodError] = useState("");

  // Fetch restaurant and its real food from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError("");
      setFoodError("");

      try {
        // Fetch restaurant details
        const restaurantResponse = await fetch(
          `${API_URL}/restaurant/${id}`,
          { signal: controller.signal }
        );

        const restaurantData =
          await restaurantResponse.json();

        if (!restaurantResponse.ok) {
          throw new Error(
            restaurantData.message ||
              "Unable to load restaurant."
          );
        }

        const currentRestaurant =
          restaurantData.restaurant;

        setRestaurant(currentRestaurant);

        // Fetch all food
        const foodResponse = await fetch(
          `${API_URL}/food/all`,
          { signal: controller.signal }
        );

        const foodData = await foodResponse.json();

        if (!foodResponse.ok) {
          throw new Error(
            foodData.message || "Unable to load food."
          );
        }

        // Only display available food belonging to this restaurant
        const allFoods = Array.isArray(foodData.foods)
          ? foodData.foods
          : [];

        const restaurantFoods = allFoods.filter(
          (item) =>
            String(item.restaurantId?._id || item.restaurantId) ===
              String(currentRestaurant._id) &&
            item.available !== false
        );

        setFoods(restaurantFoods);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Restaurant details error:", err);

          // Preserve restaurant details if only food loading failed
          if (!restaurant) {
            setError(
              err.message || "Unable to load restaurant."
            );
          } else {
            setFoodError(
              err.message || "Unable to load food."
            );
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchData();
    }

    return () => controller.abort();
  }, [id]);

  // Add a real food item to the cart
  const handleAddToCart = (item) => {
    if (!restaurant || restaurant.isOpen === false) {
      return;
    }

    addToCart({
      id: `${restaurant._id}-${item._id}`,
      foodId: item._id,
      restaurantId: restaurant._id,
      name: item.foodName,
      price: Number(item.price),
      image: item.image || food,
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="restaurant-details">
          <p>Loading restaurant and menu...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !restaurant) {
    return (
      <>
        <Navbar />

        <div className="restaurant-not-found">
          <h1>{error || "Restaurant not found"}</h1>

          <Link to="/restaurants">
            <FontAwesomeIcon icon={faArrowLeft} />
            {" "}Back to Restaurants
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  const restaurantName =
    restaurant.restaurantName || "Restaurant";

  const restaurantRating =
    Number(restaurant.rating || 0);

  const restaurantImage =
    restaurant.image || food;

  const restaurantCategory =
    restaurant.category || "Food & Restaurant";

  return (
    <>
      <Navbar />

      <main className="restaurant-details">
        {/* BACK BUTTON */}
        <Link to="/restaurants" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          {" "}Back to Restaurants
        </Link>

        {/* RESTAURANT HERO */}
        <section className="restaurant-hero">
          <img
            src={restaurantImage}
            alt={restaurantName}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = food;
            }}
          />

          <div className="restaurant-hero-info">
            <span className="open-status">
              {restaurant.isOpen === false
                ? "● Closed"
                : "● Open now"}
            </span>

            <h1>{restaurantName}</h1>

            <p className="restaurant-category">
              {restaurantCategory}
            </p>

            <div className="restaurant-meta">
              <span>
                <FontAwesomeIcon icon={faStar} />
                {" "}{restaurantRating.toFixed(1)}
              </span>

              <span>
                <FontAwesomeIcon icon={faClock} />
                {" "}20–30 min
              </span>

              <span>
                <FontAwesomeIcon icon={faTruck} />
                {" "}Delivery available
              </span>
            </div>

            <p className="restaurant-description">
              Enjoy delicious meals prepared fresh by{" "}
              {restaurantName}. Order your favourite food
              and have it delivered straight to your door.
            </p>

            {restaurant.address && (
              <p className="restaurant-address">
                <strong>Address:</strong>{" "}
                {restaurant.address}
              </p>
            )}
          </div>
        </section>

        {/* REAL MENU */}
        <section className="menu-section">
          <div className="menu-header">
            <div>
              <p>OUR MENU</p>
              <h2>Available dishes</h2>
            </div>

            <Link to="/cart" className="cart-button">
              <FontAwesomeIcon icon={faCartShopping} />
              {" "}Cart
            </Link>
          </div>

          {foodError && (
            <div className="menu-error">
              <p>{foodError}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {!foodError && foods.length === 0 && (
            <div className="empty-menu">
              <FontAwesomeIcon icon={faUtensils} />

              <h3>No food available yet</h3>

              <p>
                This restaurant has no available food items.
                Please check back later.
              </p>
            </div>
          )}

          <div className="menu-grid">
            {foods.map((item) => (
              <article
                className="food-card"
                key={item._id}
              >
                <img
                  src={item.image || food}
                  alt={item.foodName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = food;
                  }}
                />

                <div className="food-info">
                  <span className="food-category">
                    {item.category}
                  </span>

                  <h3>{item.foodName}</h3>

                  <p>{item.description}</p>

                  <div className="food-bottom">
                    <strong>
                      ₦{Number(item.price).toLocaleString("en-NG")}
                    </strong>

                    <button
                      type="button"
                      disabled={restaurant.isOpen === false}
                      onClick={() => handleAddToCart(item)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      {" "}Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <RestaurantReviews
          restaurantId={restaurant._id}
        />
      </main>

      <Footer />
    </>
  );
}

export default RestaurantDetails;