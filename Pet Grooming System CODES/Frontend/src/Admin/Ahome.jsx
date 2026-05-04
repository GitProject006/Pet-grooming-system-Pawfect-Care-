import React from "react";
import Anavbar from "./Anavbar";
import "./Ahome.css";

const Ahome = () => {
  return (
    <>
      <Anavbar />

      <div className="admin-dashboard">
        <div className="admin-header">
          <div>
            <p className="admin-small">🐾 Pawfect Care Admin Panel</p>
            <h1>Welcome back, Admin 👋</h1>
            <p>Manage users, services, products and bookings easily.</p>
          </div>

          <div className="admin-date">📅 Today’s Overview</div>
        </div>

        <div className="admin-cards">
          <div className="admin-card purple">
            <h3>👥 Users</h3>
            <h2>2</h2>
            <p>Registered customers</p>
          </div>

          <div className="admin-card green">
            <h3>✂️ Grooming</h3>
            <h2>2</h2>
            <p>Active grooming services</p>
          </div>

          <div className="admin-card pink">
            <h3>🌸 Wellness</h3>
            <h2>2</h2>
            <p>Health & wellness care</p>
          </div>

          <div className="admin-card orange">
            <h3>➕ Additional</h3>
            <h2>0</h2>
            <p>Extra pet services</p>
          </div>

          <div className="admin-card blue">
            <h3>🛒 Products</h3>
            <h2>4</h2>
            <p>Pet store products</p>
          </div>

          <div className="admin-card red">
            <h3>📌 Total Bookings</h3>
            <h2>0</h2>
            <p>All customer bookings</p>
          </div>
        </div>

        <div className="admin-bottom">
          <div className="admin-info">
            <h2>Quick Admin Actions</h2>
            <p>
              Keep your pet care business organized by updating services,
              checking products, and managing customer bookings.
            </p>
          </div>

          <div className="admin-pet-box">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=90"
              alt="pets"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ahome;