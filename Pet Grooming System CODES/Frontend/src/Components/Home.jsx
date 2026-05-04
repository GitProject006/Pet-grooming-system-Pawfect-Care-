import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <nav className="home-nav">
        <div className="home-logo">🐾 Pawfect Care</div>

        <div className="home-menu">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/uproducts">Products</Link>
          <Link to="/ulogin" className="login-button">Login</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <p className="tag">Trusted pet care at your fingertips</p>

          <h1>
            Grooming, Wellness & Products for Happy Pets
          </h1>

          <p className="desc">
            Book grooming, wellness care, and shop quality pet products in one
            easy and friendly platform.
          </p>

          <div className="hero-actions">
            <Link to="/services" className="primary">Book a Service</Link>
            <Link to="/uproducts" className="secondary">Shop Products</Link>
          </div>

          <div className="stats">
            <div><b>500+</b><span>Happy Pets</span></div>
            <div><b>4.8★</b><span>Customer Rating</span></div>
            <div><b>24/7</b><span>Easy Booking</span></div>
          </div>
        </div>

        <div className="hero-image">
   <img
  src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=90"
  alt="dog and cat"
  className="hero-main-img"
/>
          <div className="floating-card top-card">🐶 Gentle Grooming</div>
          <div className="floating-card bottom-card">🐱 Healthy & Happy Pets</div>
        </div>
      </section>

      <section className="service-section">
        <h2>Our Pet Care Services</h2>

        <div className="service-grid">
          <div className="service-card grooming">
            <h3>✂️ Grooming</h3>
            <p>Bathing, styling, brushing, and complete pet grooming care.</p>
            <Link to="/ugroom">View Details →</Link>
          </div>

          <div className="service-card wellness">
            <h3>🌿 Wellness</h3>
            <p>Pet wellness services to keep your furry friend active and healthy.</p>
            <Link to="/uwellness">View Details →</Link>
          </div>

          <div className="service-card products">
            <h3>🛒 Products</h3>
            <p>Food, beds, toys, leashes, and useful pet care products.</p>
            <Link to="/uproducts">Shop Now →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;