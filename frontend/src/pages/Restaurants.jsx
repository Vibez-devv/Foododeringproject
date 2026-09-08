import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Restaurants.css";

import cake from "../assets/images/cake.jpg";
import burger from "../assets/images/burger.jpg";
import food from "../assets/images/food.jpg";
import salad from "../assets/images/salad.jpg";
import wings from "../assets/images/wings.jpg";
import pizza from "../assets/images/pizza.jpg";

function Restaurants() {
  const restaurants = [
    {
      id: 1,
      name: "Taste Kitchen",
      category: "Nigerian • Fast Food",
      rating: "4.8",
      delivery: "20-30 min",
      image: food,
    },
    {
      id: 2,
      name: "Burger House",
      category: "Burgers • Fast Food",
      rating: "4.6",
      delivery: "15-25 min",
      image: burger,
    },
    {
      id: 3,
      name: "Pizza Palace",
      category: "Pizza • Italian",
      rating: "4.7",
      delivery: "25-35 min",
      image: pizza,
    },
    {
      id: 4,
      name: "Chicken Republic",
      category: "Chicken • Fast Food",
      rating: "4.5",
      delivery: "20-30 min",
      image: wings,
    },
    {
      id: 5,
      name: "Sweet Treats",
      category: "Desserts • Bakery",
      rating: "4.9",
      delivery: "15-25 min",
      image: cake,
    },
    {
      id: 6,
      name: "Fresh Bowl",
      category: "Healthy • Salads",
      rating: "4.6",
      delivery: "20-30 min",
      image: salad,
    },
  ];

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
          <div className="search-box">
            <input
              type="text"
              placeholder="Search restaurants..."
            />

            <button>
              Search
            </button>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="categories">

          <button className="category active">
            All
          </button>

          <button className="category">
            🍔 Fast Food
          </button>

          <button className="category">
            🍕 Pizza
          </button>

          <button className="category">
            🍗 Chicken
          </button>

          <button className="category">
            🍛 Nigerian
          </button>

          <button className="category">
            🥗 Healthy
          </button>

          <button className="category">
            🍰 Desserts
          </button>

        </section>

        {/* RESTAURANTS */}
        <section className="restaurants-list">

          <div className="restaurants-title">
            <h2>
              Popular Restaurants
            </h2>

            <select>
              <option>
                Sort by
              </option>

              <option>
                Rating
              </option>

              <option>
                Delivery Time
              </option>

              <option>
                Newest
              </option>
            </select>
          </div>

          {/* RESTAURANT CARDS */}
          <div className="restaurant-grid">

            {restaurants.map((restaurant) => (

              <div
                className="restaurant-card"
                key={restaurant.id}
              >

                {/* RESTAURANT IMAGE */}
                <div className="restaurant-image">

                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                  />

                  <div className="rating">
                    ⭐ {restaurant.rating}
                  </div>

                </div>

                {/* RESTAURANT INFORMATION */}
                <div className="restaurant-info">

                  <h3>
                    {restaurant.name}
                  </h3>

                  <p className="category-text">
                    {restaurant.category}
                  </p>

                  <p className="delivery-time">
                    🕐 {restaurant.delivery}
                  </p>

                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="view-restaurant"
                  >
                    View Restaurant
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Restaurants;