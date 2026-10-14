import { useEffect, useState } from "react";
import "./RestaurantReviews.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foododeringproject.onrender.com/api";

function RestaurantReviews({ restaurantId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!restaurantId) return;

    const controller = new AbortController();

    const fetchReviews = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/reviews/restaurant/${restaurantId}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load reviews.");
        }

        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch reviews error:", error);
          setMessage(error.message || "Unable to load reviews.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    return () => controller.abort();
  }, [restaurantId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in before submitting a review.");
      return;
    }

    if (comment.trim().length < 3) {
      setMessage("Please write at least 3 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          restaurantId,
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit review.");
      }

      setMessage("Your review was submitted successfully!");
      setComment("");

      // Reload reviews and average rating
      const reviewsResponse = await fetch(
        `${API_URL}/reviews/restaurant/${restaurantId}`
      );

      const reviewsData = await reviewsResponse.json();

      if (reviewsResponse.ok) {
        setReviews(reviewsData.reviews || []);
        setAverageRating(reviewsData.averageRating || 0);
        setTotalReviews(reviewsData.totalReviews || 0);
      }
    } catch (error) {
      console.error("Submit review error:", error);
      setMessage(error.message || "Unable to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="restaurant-reviews">
      <div className="reviews-heading">
        <h2>Customer Reviews</h2>

        <div className="reviews-summary">
          <span className="average-rating">
            {Number(averageRating).toFixed(1)}
          </span>

          <span className="rating-stars" aria-label={`${averageRating} out of 5 stars`}>
            {"★".repeat(Math.round(averageRating))}
            {"☆".repeat(5 - Math.round(averageRating))}
          </span>

          <span>
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Write a Review</h3>

        <label htmlFor="review-rating">Your rating</label>

        <select
          id="review-rating"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        >
          <option value={5}>5 stars — Excellent</option>
          <option value={4}>4 stars — Very good</option>
          <option value={3}>3 stars — Good</option>
          <option value={2}>2 stars — Fair</option>
          <option value={1}>1 star — Poor</option>
        </select>

        <label htmlFor="review-comment">Your review</label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Tell us about your experience..."
          minLength={3}
          maxLength={1000}
          rows={4}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>

        {message && (
          <p role="status" className="review-message">
            {message}
          </p>
        )}
      </form>

      <div className="reviews-list">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to share your experience!</p>
        ) : (
          reviews.map((review) => (
            <article className="review-card" key={review._id}>
              <div className="review-card-heading">
                <h4>{review.customerName}</h4>

                <span className="rating-stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>

              <p>{review.comment}</p>

              <time dateTime={review.createdAt}>
                {new Date(review.createdAt).toLocaleDateString()}
              </time>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default RestaurantReviews;