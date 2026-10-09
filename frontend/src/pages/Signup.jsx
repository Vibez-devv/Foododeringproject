import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Backend API URL
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://foododeringproject.onrender.com/api";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Check password length
    if (formData.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
        }),
      });

      // Read the response safely
      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("Server returned a non-JSON response:", responseText);

        throw new Error(
          response.status === 404
            ? "Registration endpoint not found. Please check your backend API route."
            : "The server returned an unexpected response. Please try again later."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create your account."
        );
      }

      setMessage("Account created successfully!");

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);

      if (error.message === "Failed to fetch") {
        setMessage(
          "Unable to connect to the server. Check your internet connection or backend server."
        );
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="signup-page">
        <div className="signup-card">
          <div className="signup-header">
            <h1>Create Account</h1>

            <p>
              Join Vibez(FoodHub) and start ordering your best meals.
            </p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>

                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>

                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </div>

              <label className="terms">
                <input type="checkbox" required />

                <span>I agree to the terms and conditions.</span>
              </label>

              {message && (
                <p
                  className={`signup-message ${
                    message.includes("successfully")
                      ? "success"
                      : "error"
                  }`}
                  role="status"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="signup-submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Your Food Account"}
              </button>
            </div>
          </form>

          <div className="login-link">
            <p>
              Already have a food account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Signup;