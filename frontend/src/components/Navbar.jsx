import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Vibez(Food<span>Hub)</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/restaurants">Restaurants</Link>

          <Link to="/orders">Orders</Link>

          <Link to="/add-food">Add Food</Link>

          <Link to="/manage-foods">Manage Foods</Link>
        </div>

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
