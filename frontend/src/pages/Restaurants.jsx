import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faStar,
  faClock,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Restaurants.css";

import cake from "../assets/images/cake.jpg";
import burger from "../assets/images/burger.jpg";
import food from "../assets/images/food.jpg";
import salad from "../assets/images/salad.jpg";
import wings from "../assets/images/wings.jpg";
import pizza from "../assets/images/pizza.jpg";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foododeringproject.onrender.com/api";

const fallbackImages = [food, burger, pizza, wings, cake, salad];

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch restaurants from MongoDB
  useEffect(() => {
    const controller = new AbortController();

    const fetchRestaurants = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/restaurant/all`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load restaurants."
          );
        }

        const restaurantData = Array.isArray(data.restaurants)
          ? data.restaurants
          : [];

        setRestaurants(restaurantData);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch restaurants error:", err);

          setError(
            err.message ||
              "Unable to connect to the restaurant server."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchRestaurants();

    return () => controller.abort();
  }, []);

  // Convert database restaurant information into display data
  const formattedRestaurants = useMemo(() => {
    return restaurants.map((restaurant, index) => {
      const name = restaurant.restaurantName || "Restaurant";

      const category = restaurant.category || "Food & Restaurant";

      const image =
        restaurant.image ||
        fallbackImages[index % fallbackImages.length];

      return {
        ...restaurant,
        displayName: name,
        displayCategory: category,
        displayRating: Number(restaurant.rating || 0),
        displayDelivery: "20–30 min",
        displayImage: image,
      };
    });
  }, [restaurants]);

  // Categories for filtering
  const categories = [
    "All",
    "Fast Food",
    "Pizza",
    "Chicken",
    "Nigerian",
    "Healthy",
    "Desserts",
  ];

  // Search, category filtering and sorting
  const filteredRestaurants = useMemo(() => {
    let result = [...formattedRestaurants];

    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((restaurant) => {
        const name = restaurant.displayName.toLowerCase();

        const category =
          restaurant.displayCategory.toLowerCase();

        const address = (restaurant.address || "").toLowerCase();

        return (
          name.includes(searchText) ||
          category.includes(searchText) ||
          address.includes(searchText)
        );
      });
    }

    if (activeCategory !== "All") {
      const categoryText = activeCategory.toLowerCase();

      result = result.filter((restaurant) => {
        const category =
          restaurant.displayCategory.toLowerCase();

        const name = restaurant.displayName.toLowerCase();

        if (categoryText === "nigerian") {
          return (
            category.includes("nigerian") ||
            name.includes("taste kitchen")
          );
        }

        if (categoryText === "fast food") {
          return (
            category.includes("fast food") ||
            category.includes("burger")
          );
        }

        if (categoryText === "pizza") {
          return (
            category.includes("pizza") ||
            category.includes("italian")
          );
        }

        if (categoryText === "chicken") {
          return (
            category.includes("chicken") ||
            category.includes("wings")
          );
        }

        if (categoryText === "healthy") {
          return (
            category.includes("healthy") ||
            category.includes("salad")
          );
        }

        if (categoryText === "desserts") {
          return (
            category.includes("dessert") ||
            category.includes("bakery") ||
            category.includes("cake")
          );
        }

        return category.includes(categoryText);
      });
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) => b.displayRating - a.displayRating
      );
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    return result;
  }, [formattedRestaurants, search, activeCategory, sortBy]);

  return (
    <>
      <Navbar />

      <main className="restaurants-page">
        {/* HEADER */}
        <section className="restaurants-header">
          <div>
            <p>DISCOVER GREAT FOOD</p>

            <h1>Restaurants near you</h1>

            <span>
              Find your favorite meals from the best restaurants.
            </span>
          </div>

          {/* SEARCH */}
          <form
            className="search-box"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              placeholder="Search restaurants..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search restaurants"
            />

            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
              {" "}Search
            </button>
          </form>
        </section>

        {/* CATEGORIES */}
        <section className="categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        {/* RESTAURANTS */}
        <section className="restaurants-list">
          <div className="restaurants-title">
            <h2>Popular Restaurants</h2>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort restaurants"
            >
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* LOADING */}
          {loading && (
            <p className="restaurants-status">
              Loading restaurants...
            </p>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="restaurants-status restaurants-error">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY DATABASE */}
          {!loading && !error && restaurants.length === 0 && (
            <div className="restaurants-status">
              <FontAwesomeIcon icon={faUtensils} />

              <h3>No restaurants available yet</h3>

              <p>
                Restaurants will appear here once they have been
                added to VibezFoodHub.
              </p>
            </div>
          )}

          {/* RESTAURANT CARDS */}
          {!loading && !error && filteredRestaurants.length > 0 && (
            <div className="restaurant-grid">
              {filteredRestaurants.map((restaurant) => (
                <div
                  className="restaurant-card"
                  key={restaurant._id}
                >
                  {/* RESTAURANT IMAGE */}
                  <div className="restaurant-image">
                    <img
                      src={restaurant.displayImage}
                      alt={restaurant.displayName}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = food;
                      }}
                    />

                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} />
                      {" "}
                      {restaurant.displayRating.toFixed(1)}
                    </div>
                  </div>

                  {/* RESTAURANT INFORMATION */}
                  <div className="restaurant-info">
                    <h3>{restaurant.displayName}</h3>

                    <p className="category-text">
                      {restaurant.displayCategory}
                    </p>

                    <p className="delivery-time">
                      <FontAwesomeIcon icon={faClock} />
                      {" "}
                      {restaurant.displayDelivery}
                    </p>

                    {restaurant.address && (
                      <p className="restaurant-address">
                        {restaurant.address}
                      </p>
                    )}

                    <Link
                      to={`/restaurant/${restaurant._id}`}
                      className="view-restaurant"
                    >
                      View Restaurant
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NO SEARCH RESULTS */}
          {!loading &&
            !error &&
            restaurants.length > 0 &&
            filteredRestaurants.length === 0 && (
              <div className="restaurants-status">
                <h3>No matching restaurants found</h3>

                <p>
                  Try another search term or choose a different
                  category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Restaurants;