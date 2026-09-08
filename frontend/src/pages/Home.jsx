import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

import foodImage from "../assets/images/food.jpg";
import foodie from "../assets/videos/foodie.mp4";

function Home() {
  return (
    <div className="home">
      <Navbar />

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">

          <div className="hero-text">
            <div className="hero-small">

              <p>FAST.FRESH. & DELICIOUS</p>

              <h1>
                Your Favourite Food,
                <span>delivered to you.</span>
              </h1>

              <p className="hero-descrpition">
                Discover the best restaurants around you, order your favorite
                meals and enjoy fast delivery right to your doorstep.
              </p>

              <div className="hero-buttons">

                <a
                  href="/restaurants"
                  className="primary-btn"
                >
                  Order Now
                </a>

                <a
                  href="/restaurants"
                  className="secondary-btn"
                >
                  Explore Restaurants
                </a>

              </div>

            </div>
          </div>


          {/* HERO FOOD VIDEO */}

          <div className="hero-image">

            <div className="food-circle">

              <video
                src={foodie}
                autoPlay
                muted
                loop
                playsInline
              />

            </div>

          </div>

        </div>
      </section>


      {/* FEATURES */}

      <section className="features">

        <div className="section-title">

          <p>WHY CHOOSE US</p>

          <h2>
            Everything you need for a great mea
          </h2>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <h3>
              Delivery at speed of light
            </h3>

            <p>
              Get your delicous meals deliver to your door step
            </p>

          </div>


          <div className="feature-card">

            <h3>
              Delicous food
            </h3>

            <p>
              Choose from delicious meals offered by restaurants around you.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-location-crosshairs"></i>

            </div>

            <h3>
              Live tracking
            </h3>

            <p>
              Track your order and know exactly where your delivery is.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">

              <i className="fa-solid fa-star"></i>

            </div>

            <h3>
              Reviews
            </h3>

            <p>
              Read reviews from other customers before choosing your meal.
            </p>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="how-it-works">

        <div className="section-title">

          <p>HOW IT WORKS</p>

          <h2>
            Order food in three simple steps
          </h2>

        </div>


        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Choose a Restaurant
            </h3>

            <p>
              Browse restaurants and find your favorite food.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Place Your Order
            </h3>

            <p>
              Add your food to the cart and checkout securely.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Track Your Delivery
            </h3>

            <p>
              Follow your order until it arrives at your door.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta">

        <div>

          <h2>
            Hungry? Let's fix that.
          </h2>

          <p>
            Find your best meals here today
          </p>

        </div>

        <a href="/restourants">
          Browse Food
        </a>

      </section>


      <Footer />

    </div>
  );
}

export default Home;