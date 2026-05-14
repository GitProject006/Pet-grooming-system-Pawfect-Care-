import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../api';
import "./Signup.css";

const Usignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = { name, email, password };
axios.post(`${API}/api/auth/usignup`, payload)
      .then((result) => {
        alert('Account created');
        console.log(result);
        navigate('/ulogin');
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create an account");
      });
  };

  const formHandle1 = (e) => {
    e.preventDefault();
    navigate("/ulogin");
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <h1 className="brand">🐾 Pawfect Care</h1>

        <h2>
          Create an <br /> account
        </h2>

        <h3>for your pet’s ♡</h3>

        <p>
          Join Pawfect Care and give your furry friend the best grooming experience.
        </p>

        <img
  src="https://pngimg.com/uploads/golden_retriever/golden_retriever_PNG39.png"
  className="dog-img"
  alt="golden retriever"
/>

        <div className="love-badge">🐾 We care with love</div>
      </div>

      <div className="signup-right">
        <div className="signup-box">
          <p className="welcome">Welcome back! ♡</p>

          <h2>Signup</h2>

          <p className="sub">Fill in the details to create your account</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button type="submit">🐾 Signup</button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <span onClick={formHandle1}>Login</span>
          </p>

          <div className="features">
            <span>🛡 Trusted Groomers</span>
            <span>🔒 Safe & Secure</span>
            <span>📅 Easy Booking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usignup;
