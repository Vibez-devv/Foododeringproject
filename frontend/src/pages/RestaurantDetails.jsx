import React from "react";
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

import { useCart } from "../contexts/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./RestaurantDetails.css";

import food from "../assets/images/food.jpg";
import burger from "../assets/images/burger.jpg";
import pizza from "../assets/images/pizza.jpg";
import wings from "../assets/images/wings.jpg";
import cake from "../assets/images/cake.jpg";
import salad from "../assets/images/salad.jpg";
// import { useCart } from "../contexts/CartContext";

function RestaurantDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();




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


  /* ================================
     FIND RESTAURANT
  ================================= */

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );


  /* ================================
     RESTAURANT NOT FOUND
  ================================= */

  if (!restaurant) {

    return (
      <>
        <Navbar />

        <div className="restaurant-not-found">

          <h1>
            Restaurant not found
          </h1>

          <Link to="/restaurants">
            <FontAwesomeIcon icon={faArrowLeft} />
            {" "}
            Back to Restaurants
          </Link>

        </div>

        <Footer />
      </>
    );
  }


  /* ================================
     ADD TO CART
  ================================= */

  const handleAddToCart = (
    foodId,
    name,
    price,
    image
  ) => {

    addToCart({
      id: `${restaurant.id}-${foodId}`,
      name: name,
      price: price,
      image: image,
    });

  };


  return (
    <>
      <Navbar />


      <main className="restaurant-details">


        {/* ================================
            BACK
        ================================= */}

        <Link
          to="/restaurants"
          className="back-link"
        >
          <FontAwesomeIcon icon={faArrowLeft} />

          {" "} Back to Restaurants
        </Link>



        {/* ================================
            RESTAURANT HERO
        ================================= */}

        <section className="restaurant-hero">


          <img
            src={restaurant.image}
            alt={restaurant.name}
          />


          <div className="restaurant-hero-info">


            <span className="open-status">
              ● Open now
            </span>


            <h1>
              {restaurant.name}
            </h1>


            <p className="restaurant-category">
              {restaurant.category}
            </p>


            <div className="restaurant-meta">


              <span>

                <FontAwesomeIcon
                  icon={faStar}
                />

                {" "} {restaurant.rating}

              </span>


              <span>

                <FontAwesomeIcon
                  icon={faClock}
                />

                {" "} {restaurant.delivery}

              </span>


              <span>

                <FontAwesomeIcon
                  icon={faTruck}
                />

                {" "} Free delivery

              </span>


            </div>


            <p className="restaurant-description">

              Enjoy delicious meals prepared fresh
              by our restaurant. Order your favorite
              food and have it delivered straight to
              your door.

            </p>


          </div>

        </section>



        {/* ================================
            MENU
        ================================= */}

        <section className="menu-section">


          <div className="menu-header">


            <div>

              <p>
                OUR MENU
              </p>

              <h2>
                Popular dishes
              </h2>

            </div>


            <Link
              to="/cart"
              className="cart-button"
            >

              <FontAwesomeIcon
                icon={faCartShopping}
              />

              {" "} Cart

            </Link>


          </div>



          {/* ================================
              FOOD GRID
          ================================= */}

          <div className="menu-grid">


            {/* ================================
                SPECIAL MEAL
            ================================= */}

            <div className="food-card">


              <img
                src={restaurant.image}
                alt="Special Meal"
              />


              <div className="food-info">


                <h3>
                  Special Meal
                </h3>


                <p>
                  Delicious freshly prepared meal.
                </p>


                <div className="food-bottom">


                  <strong>
                    ₦4,500
                  </strong>


                  <button
                    onClick={() =>
                      handleAddToCart(
                        "special",
                        "Special Meal",
                        4500,
                        restaurant.image
                      )
                    }
                  >

                    <FontAwesomeIcon
                      icon={faPlus}
                    />

                    {" "} Add to Cart

                  </button>


                </div>

              </div>

            </div>



            {/* ================================
                BURGER
            ================================= */}

            <div className="food-card">


              <img
                src={burger}
                alt="Classic Burger"
              />


              <div className="food-info">


                <h3>
                  Classic Burger
                </h3>


                <p>
                  Juicy burger with fresh ingredients.
                </p>


                <div className="food-bottom">


                  <strong>
                    ₦3,500
                  </strong>


                  <button
                    onClick={() =>
                      handleAddToCart(
                        "burger",
                        "Classic Burger",
                        3500,
                        burger
                      )
                    }
                  >

                    <FontAwesomeIcon
                      icon={faPlus}
                    />

                    {" "} Add to Cart

                  </button>


                </div>

              </div>

            </div>



            {/* ================================
                PIZZA
            ================================= */}

            <div className="food-card">


              <img
                src={pizza}
                alt="Chicken Pizza"
              />


              <div className="food-info">


                <h3>
                  Chicken Pizza
                </h3>


                <p>
                  Hot pizza loaded with chicken
                  and cheese.
                </p>


                <div className="food-bottom">


                  <strong>
                    ₦5,500
                  </strong>


                  <button
                    onClick={() =>
                      handleAddToCart(
                        "pizza",
                        "Chicken Pizza",
                        5500,
                        pizza
                      )
                    }
                  >

                    <FontAwesomeIcon
                      icon={faPlus}
                    />

                    {" "} Add to Cart

                  </button>


                </div>

              </div>

            </div>



          </div>

        </section>


      </main>


      <Footer />

    </>
  );
}


export default RestaurantDetails;