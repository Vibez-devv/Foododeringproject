import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo" onClick={closeMenu}>
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
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/restaurants" onClick={closeMenu}>
            Restaurants
          </Link>

          <Link to="/orders" onClick={closeMenu}>
            Orders
          </Link>

          <Link to="/add-food" onClick={closeMenu}>
            Add Food
          </Link>

          <Link to="/manage-foods" onClick={closeMenu}>
            Manage Foods
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            <span>0</span>
          </Link>

          <Link to="/login" className="login-btn">
            <FaUser />
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;