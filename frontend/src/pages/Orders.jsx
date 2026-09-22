import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Orders.css";

function Orders() {
  return (
    <>
      <Navbar />

      <main className="orders-page">
        <div className="orders-container">
          <div className="orders-header">
            <h1>My Orders</h1>
            <p>Track and manage your food orders.</p>
          </div>

          <div className="orders-empty">
            <i className="fa-solid fa-bag-shopping"></i>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet. Start exploring restaurants
              and order your favorite meals.
            </p>

            <a href="/restaurants" className="orders-btn">
              Browse Restaurants
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Orders;