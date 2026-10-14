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
} from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../contexts/Cartcontext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RestaurantReviews from "../components/RestaurantReviews";

import "./RestaurantDetails.css";

import food from "../assets/images/food.jpg";
import burger from "../assets/images/burger.jpg";
import pizza from "../assets/images/pizza.jpg";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foododeringproject.onrender.com/api";

function RestaurantDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load the restaurant from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    const fetchRestaurant = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/restaurant/${id}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load restaurant."
          );
        }

        setRestaurant(data.restaurant);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Restaurant fetch error:", err);
          setError(err.message || "Unable to load restaurant.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchRestaurant();
    }

    return () => controller.abort();
  }, [id]);

  // Add food to cart
  const handleAddToCart = (foodId, name, price, image) => {
    if (!restaurant) return;

    addToCart({
      id: `${restaurant._id}-${foodId}`,
      foodId,
      restaurantId: restaurant._id,
      name,
      price,
      image,
    });
  };

  // Loading screen
  if (loading) {
    return (
      <>
        <Navbar />

        <main className="restaurant-details">
          <p>Loading restaurant...</p>
        </main>

        <Footer />
      </>
    );
  }

  // Error or restaurant not found
  if (error || !restaurant) {
    return (
      <>
        <Navbar />

        <div className="restaurant-not-found">
          <h1>
            {error || "Restaurant not found"}
          </h1>

          <Link to="/restaurants">
            <FontAwesomeIcon icon={faArrowLeft} />
            {" "}Back to Restaurants
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  // Use database restaurant properties
  const restaurantName =
    restaurant.restaurantName || "Restaurant";

  const restaurantRating = Number(restaurant.rating || 0);

  const restaurantImage =
    restaurant.image || food;

  const restaurantCategory =
    restaurant.category || "Food & Restaurant";

  return (
    <>
      <Navbar />

      <main className="restaurant-details">

        {/* BACK BUTTON */}
        <Link
          to="/restaurants"
          className="back-link"
        >
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
                {" "}
                {restaurantRating.toFixed(1)}
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
              {restaurantName}. Order your favorite food
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

        {/* MENU */}
        <section className="menu-section">

          <div className="menu-header">

            <div>
              <p>OUR MENU</p>
              <h2>Popular dishes</h2>
            </div>

            <Link
              to="/cart"
              className="cart-button"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {" "}Cart
            </Link>

          </div>

          {/* FOOD GRID */}
          <div className="menu-grid">

            {/* SPECIAL MEAL */}
            <div className="food-card">

              <img
                src={restaurantImage}
                alt="Special Meal"
              />

              <div className="food-info">

                <h3>Special Meal</h3>

                <p>
                  Delicious freshly prepared meal.
                </p>

                <div className="food-bottom">

                  <strong>₦4,500</strong>

                  <button
                    type="button"
                    disabled={restaurant.isOpen === false}
                    onClick={() =>
                      handleAddToCart(
                        "special",
                        "Special Meal",
                        4500,
                        restaurantImage
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    {" "}Add to Cart
                  </button>

                </div>
              </div>
            </div>

            {/* BURGER */}
            <div className="food-card">

              <img
                src={burger}
                alt="Classic Burger"
              />

              <div className="food-info">

                <h3>Classic Burger</h3>

                <p>
                  Juicy burger with fresh ingredients.
                </p>

                <div className="food-bottom">

                  <strong>₦3,500</strong>

                  <button
                    type="button"
                    disabled={restaurant.isOpen === false}
                    onClick={() =>
                      handleAddToCart(
                        "burger",
                        "Classic Burger",
                        3500,
                        burger
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    {" "}Add to Cart
                  </button>

                </div>
              </div>
            </div>

            {/* PIZZA */}
            <div className="food-card">

              <img
                src={pizza}
                alt="Chicken Pizza"
              />

              <div className="food-info">

                <h3>Chicken Pizza</h3>

                <p>
                  Hot pizza loaded with chicken and cheese.
                </p>

                <div className="food-bottom">

                  <strong>₦5,500</strong>

                  <button
                    type="button"
                    disabled={restaurant.isOpen === false}
                    onClick={() =>
                      handleAddToCart(
                        "pizza",
                        "Chicken Pizza",
                        5500,
                        pizza
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    {" "}Add to Cart
                  </button>

                </div>
              </div>
            </div>

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