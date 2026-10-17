import { useEffect, useState } from "react";
import "./AddFood.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foododeringproject.onrender.com/api";

function AddFood() {
  const [restaurants, setRestaurants] = useState([]);

  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    price: "",
    category: "",
    image: "",
    restaurantId: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] =
    useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load restaurants from MongoDB
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `${API_URL}/restaurant/all`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load restaurants."
          );
        }

        setRestaurants(data.restaurants || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Update form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // Submit food to backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in before adding food.");
      return;
    }

    if (!formData.restaurantId) {
      setError("Please select a restaurant.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/food/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodName: formData.foodName.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          category: formData.category.trim(),
          image: formData.image.trim(),
          restaurantId: formData.restaurantId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to add food."
        );
      }

      setMessage("Food added successfully!");

      setFormData({
        foodName: "",
        description: "",
        price: "",
        category: "",
        image: "",
        restaurantId: "",
      });
    } catch (err) {
      setError(
        `${err.message} If this continues, check your food API route.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-food-page">
      <div className="add-food-container">
        <div className="add-food-heading">
          <span className="add-food-eyebrow">
            VIBEZ FOODHUB
          </span>

          <h1>Add New Food</h1>

          <p>
            Add delicious meals to your restaurant menu.
          </p>
        </div>

        {message && (
          <div className="add-food-message success">
            {message}
          </div>
        )}

        {error && (
          <div className="add-food-message error">
            {error}
          </div>
        )}

        <form
          className="add-food-form"
          onSubmit={handleSubmit}
        >
          <div className="add-food-field">
            <label htmlFor="foodName">
              Food Name
            </label>

            <input
              id="foodName"
              name="foodName"
              type="text"
              placeholder="e.g. Jollof Rice"
              value={formData.foodName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-food-field">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe this delicious meal..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="add-food-row">
            <div className="add-food-field">
              <label htmlFor="price">
                Price (₦)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="1"
                step="0.01"
                placeholder="e.g. 3500"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-food-field">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select category
                </option>

                <option value="Rice">
                  Rice
                </option>

                <option value="Swallow">
                  Swallow
                </option>

                <option value="Fast Food">
                  Fast Food
                </option>

                <option value="Chicken">
                  Chicken
                </option>

                <option value="Seafood">
                  Seafood
                </option>

                <option value="Drinks">
                  Drinks
                </option>

                <option value="Desserts">
                  Desserts
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>

          <div className="add-food-field">
            <label htmlFor="image">
              Food Image URL
            </label>

            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/food.jpg"
              value={formData.image}
              onChange={handleChange}
            />

            <small>
              Paste a publicly accessible image URL.
            </small>
          </div>

          <div className="add-food-field">
            <label htmlFor="restaurantId">
              Select Restaurant
            </label>

            <select
              id="restaurantId"
              name="restaurantId"
              value={formData.restaurantId}
              onChange={handleChange}
              required
              disabled={loadingRestaurants}
            >
              <option value="">
                {loadingRestaurants
                  ? "Loading restaurants..."
                  : "Choose a restaurant"}
              </option>

              {restaurants.map((restaurant) => (
                <option
                  key={restaurant._id}
                  value={restaurant._id}
                >
                  {restaurant.restaurantName}
                </option>
              ))}
            </select>

            {!loadingRestaurants &&
              restaurants.length === 0 && (
                <small>
                  No restaurants found. Create a restaurant first.
                </small>
              )}
          </div>

          <button
            type="submit"
            className="add-food-submit"
            disabled={
              loading ||
              loadingRestaurants ||
              restaurants.length === 0
            }
          >
            {loading
              ? "Adding Food..."
              : "Add Food to Menu"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddFood;