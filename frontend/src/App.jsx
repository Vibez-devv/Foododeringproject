import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageFoods from "./pages/ManageFoods";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./contexts/Cartcontext";
// import OrderTracking from "./pages/OrderTracking";
import OrderTracking from "./pages/orderTracking";
import AddFood from "./pages/AddFood";
import ManageUsers from "./pages/ManageUsers";
import ManageOrders from "./pages/ManageOrders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/restaurants" element={<Restaurants />} />

          <Route path="/restaurant/:id" element={<RestaurantDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/track-order" element={<OrderTracking />} />

          <Route path="/add-food" element={<AddFood />} />

          <Route path="/manage-foods" element={<ManageFoods />} />

          <Route path="/manage-users" element={<ManageUsers />} />

          <Route path="/manage-orders" element={<ManageOrders />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
