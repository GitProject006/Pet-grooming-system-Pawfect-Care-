import React from "react";
import { Link } from "react-router-dom";
import Unavbar from "./Unavbar";
import "./Uhome.css";

const Uhome = () => {
  return (
    <>
      <Unavbar />

      <div className="user-home">
        <section className="user-hero-section">
          <div className="user-hero-content">
            <p className="user-welcome">🐾 Welcome back to Pawfect Care</p>

            <h1>
              Make Your Pet’s Day <br />
              <span>Healthy, Happy & Stylish</span>
            </h1>

            <p className="user-description">
              Book grooming, wellness care, additional services, and shop pet
              essentials in one beautiful place.
            </p>

            <div className="user-buttons">
              <Link to="/services" className="book-btn">Book Service</Link>
              <Link to="/uproducts" className="shop-btn">Shop Products</Link>
            </div>

            <div className="quick-stats">
              <div>
                <h3>500+</h3>
                <p>Happy Pets</p>
              </div>
              <div>
                <h3>4.8★</h3>
                <p>Rating</p>
              </div>
              <div>
                <h3>24/7</h3>
                <p>Easy Booking</p>
              </div>
            </div>
          </div>

          <div className="user-hero-image">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=90"
              alt="dog and cat"
            />

            <div className="float-card float-one">✂️ Grooming Care</div>
            <div className="float-card float-two">🐱 Happy & Healthy Pets</div>
          </div>
        </section>

        <section className="services-title">
          <h2>What would you like to do today?</h2>
          <p>Choose a service and give your pet the care it deserves.</p>
        </section>

        <section className="user-service-cards">
          <Link to="/ugroom" className="service-box groom-box">
            <div className="icon-circle">✂️</div>
            <h3>Grooming</h3>
            <p>Bathing, haircut, brushing and complete grooming care.</p>
            <span>Explore →</span>
          </Link>

          <Link to="/uwellness" className="service-box wellness-box">
            <div className="icon-circle">🌿</div>
            <h3>Wellness</h3>
            <p>Keep your pet active, healthy and refreshed.</p>
            <span>Explore →</span>
          </Link>

          <Link to="/uadditional" className="service-box extra-box">
            <div className="icon-circle">🐾</div>
            <h3>Additional</h3>
            <p>Extra care services for comfort and happiness.</p>
            <span>Explore →</span>
          </Link>

          <Link to="/uproducts" className="service-box product-box">
            <div className="icon-circle">🛒</div>
            <h3>Products</h3>
            <p>Food, toys, beds, leashes and pet essentials.</p>
            <span>Shop →</span>
          </Link>
        </section>

        <section className="cute-banner">
          <h3>🐶 Because every pet deserves love, comfort and care 🐱</h3>
        </section>
      </div>
    </>
  );
};

export default Uhome;