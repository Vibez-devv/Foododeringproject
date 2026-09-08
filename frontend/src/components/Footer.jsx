import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>
            VibezFood<span>Hub</span>
          </h2>

          <p>
            Delicious food delivered straight to your doorstep.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/restaurants">Restaurants</a>
          <a href="/orders">Orders</a>
        </div>

        <div className="footer-section">
          <h3>Customer</h3>

          <a href="/login">Login</a>
          <a href="/signup">Create Account</a>
          <a href="/cart">Shopping Cart</a>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>Email:abdulrasheedabdulkadir554@gmail.com.</p>
          <p>Phone: +234 7081635810</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 VibezFoodHub. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;