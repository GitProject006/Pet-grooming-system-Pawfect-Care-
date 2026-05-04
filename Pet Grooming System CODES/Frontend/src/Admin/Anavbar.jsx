import React, { useState } from 'react';
import '../User/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

function Anavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    alert('Logout Successful');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">

        {/* Brand */}
        <div className="navbar-brand brand-logo">
          🐾 Pawfect Care
          <strong className="admin-text">Admin</strong>
        </div>

        {/* Navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/ahome">Dashboard</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>

          <li
            className="nav-item"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="dropdown">
              <button className="dropbtn nav-link" style={{ background: "none" }}>
                Services
              </button>

              <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                <Link to="/getgroom">Grooming</Link>
                <Link to="/getwellness">Wellness</Link>
                <Link to="/getadditional">Additional</Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/getproducts">Products</Link>
          </li>
        </ul>

        <button className="cssbuttons-io-button" onClick={logout}>
          Logout
          <div className="icon">
            <svg height="24" width="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>

      </div>
    </nav>
  );
}

export default Anavbar;