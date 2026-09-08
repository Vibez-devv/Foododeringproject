import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ManageFoods.css";
import burger from "../assets/images/burger.jpg";
import pizza from "../assets/images/pizza.jpg";

function ManageFoods() {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Cheese Burger",
      description: "Juicy beef burger with cheese",
      price: 3500,
      category: "Burger",
      image: "burger",
      available: true,
    },
    {
      id: 2,
      name: "Chicken Pizza",
      description: "Delicious chicken pizza with cheese",
      price: 5000,
      category: "Pizza",
      image: "pizza",
      available: true,
    },
    {
      id: 3,
      name: "Fried Chicken",
      description: "Crispy fried chicken",
      price: 4000,
      category: "Chicken",
      image: "wings",
      available: false,
    },
  ]);

  const toggleAvailability = (id) => {
    setFoods(
      foods.map((food) =>
        food.id === id ? { ...food, available: !food.available } : food,
      ),
    );
  };

  const deleteFood = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?",
    );

    if (confirmDelete) {
      setFoods(foods.filter((food) => food.id !== id));
    }
  };

  return (
    <div className="manage-foods-page">
      <Navbar />

      <div className="manage-foods-container">
        <div className="manage-foods-header">
          <div>
            <h1>
              <i className="fa-solid fa-utensils"></i>
              Manage Foods
            </h1>

            <p>Manage your restaurant menu and food availability.</p>
          </div>

          <a href="/add-food" className="add-new-food-btn">
            <i className="fa-solid fa-plus"></i>
            Add Food
          </a>
        </div>

        <div className="foods-grid">
          {foods.map((food) => (
            <div className="food-management-card" key={food.id}>
              <div className="food-image">
                {food.image ? (
                  <img src={food.image} alt={food.name} />
                ) : (
                  <i className="fa-solid fa-utensils"></i>
                )}
              </div>

              <div className="food-info">
                <div className="food-title">
                  <h2>{food.name}</h2>

                  <span
                    className={food.available ? "available" : "unavailable"}
                  >
                    {food.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <p className="food-description">{food.description}</p>

                <p className="food-category">
                  <i className="fa-solid fa-list"></i>
                  {food.category}
                </p>

                <h3>₦{food.price.toLocaleString()}</h3>

                <div className="food-actions">
                  <button
                    className="availability-btn"
                    onClick={() => toggleAvailability(food.id)}
                  >
                    <i className="fa-solid fa-toggle-on"></i>

                    {food.available ? "Mark Unavailable" : "Mark Available"}
                  </button>

                  <button
                    className="edit-food-btn"
                    onClick={() => {
                      window.location.href = `/edit-food/${food.id}`;
                    }}
                  >
                    <i className="fa-solid fa-pen"></i>
                    Edit
                  </button>
                  <button
                    className="delete-food-btn"
                    onClick={() => deleteFood(food.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ManageFoods;
