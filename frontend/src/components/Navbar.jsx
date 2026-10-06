import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../contexts/Cartcontext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Total number of food items in the cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          Vibez(Food<span>Hub)</span>
        </Link>

        {/* HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* NAV LINKS */}
        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            onClick={closeMenu}
          >
            Restaurants
          </Link>

          <Link
            to="/orders"
            onClick={closeMenu}
          >
            Orders
          </Link>

          <Link
            to="/add-food"
            onClick={closeMenu}
          >
            Add Food
          </Link>

          <Link
            to="/manage-foods"
            onClick={closeMenu}
          >
            Manage Foods
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-actions">

          {/* CART */}
          <Link
            to="/cart"
            className="cart-icon"
            onClick={closeMenu}
          >
            <FaShoppingCart />

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

          {/* LOGIN */}
          <Link
            to="/login"
            className="login-btn"
            onClick={closeMenu}
          >
            <FaUser />
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;