import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCartShopping,
  faPlus,
  faMinus,
  faTrash,
  faBagShopping,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { useCart } from "../contexts/Cartcontext";

import "./Cart.css";


function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();


  /* ================================
     EMPTY CART
  ================================= */

  if (cartItems.length === 0) {

    return (
      <main className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">

            <FontAwesomeIcon
              icon={faCartShopping}
            />

          </div>


          <h1>
            Your cart is empty
          </h1>


          <p>
            You haven't added any food to your
            cart yet.
          </p>


          <Link
            to="/restaurants"
            className="browse-food-btn"
          >

            <FontAwesomeIcon
              icon={faUtensils}
            />

            {" "} Browse Restaurants

          </Link>

        </div>

      </main>
    );
  }


  /* ================================
     CART
  ================================= */

  return (

    <main className="cart-page">


      {/* ================================
          HEADER
      ================================= */}

      <div className="cart-header">


        <Link
          to="/restaurants"
          className="back-to-restaurants"
        >

          <FontAwesomeIcon
            icon={faArrowLeft}
          />

          {" "} Continue Shopping

        </Link>


        <h1>

          <FontAwesomeIcon
            icon={faCartShopping}
          />

          {" "} Your Cart

        </h1>


        <p>
          {cartItems.length}{" "}
          {cartItems.length === 1
            ? "item"
            : "items"}
        </p>

      </div>



      {/* ================================
          CART CONTENT
      ================================= */}

      <div className="cart-container">


        {/* ================================
            CART ITEMS
        ================================= */}

        <section className="cart-items">


          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >


              {/* FOOD IMAGE */}

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />



              {/* FOOD DETAILS */}

              <div className="cart-item-details">


                <h2>
                  {item.name}
                </h2>


                <p className="item-price">

                  ₦{item.price.toLocaleString()}

                </p>



                {/* QUANTITY */}

                <div className="quantity-control">


                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                  >

                    <FontAwesomeIcon
                      icon={faMinus}
                    />

                  </button>


                  <span>
                    {item.quantity}
                  </span>


                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    className="quantity-btn"
                    aria-label="Increase quantity"
                  >

                    <FontAwesomeIcon
                      icon={faPlus}
                    />

                  </button>


                </div>


              </div>



              {/* ITEM TOTAL */}

              <div className="cart-item-right">


                <strong>

                  ₦
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}

                </strong>


                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="remove-btn"
                >

                  <FontAwesomeIcon
                    icon={faTrash}
                  />

                  {" "} Remove

                </button>


              </div>


            </div>

          ))}


          {/* CLEAR CART */}

          <button
            onClick={clearCart}
            className="clear-cart-btn"
          >

            <FontAwesomeIcon
              icon={faTrash}
            />

            {" "} Clear Cart

          </button>


        </section>



        {/* ================================
            ORDER SUMMARY
        ================================= */}

        <aside className="cart-summary">


          <h2>
            Order Summary
          </h2>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₦{cartTotal.toLocaleString()}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery Fee
            </span>

            <strong>
              ₦1,000
            </strong>

          </div>


          <div className="summary-line"></div>


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₦{(
                cartTotal + 1000
              ).toLocaleString()}
            </strong>

          </div>


          <Link
            to="/checkout"
            className="checkout-btn"
          >

            <FontAwesomeIcon
              icon={faBagShopping}
            />

            {" "} Proceed to Checkout

          </Link>


        </aside>


      </div>

    </main>

  );
}


export default Cart;