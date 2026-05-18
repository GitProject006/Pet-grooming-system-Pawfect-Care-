import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API from '../api';
import { FaSignOutAlt } from 'react-icons/fa';

const Ulogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { email, password };
    axios.post(`${API}/api/auth/ulogin`, payload)
      .then((res) => {
        console.log("login: " + res.data.Status);
        if (res.data.Status === "Success") {
          console.log(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('token', res.data.token);
          navigate('/uhome');
          alert("login successful");
        } else {
          alert("wrong credentials");
        }
      })
      .catch((err) => console.log(err));
  };

  let formHandle1 = (e) => {
    e.preventDefault();
    navigate("/usignup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-green-300 relative p-6">
      {/* Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-lg transition-transform hover:scale-110"
        title="Go to Home"
      >
        <FaSignOutAlt className="text-xl" />
      </Link>

      {/* Admin Login Shortcut */}
      <div className="absolute top-6 right-6">
        <Link
          to="/alogin"
          className="text-blue-800 text-lg font-medium border-b-2 border-transparent hover:border-blue-800"
        >
          Admin Login
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex bg-white/30 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden" style={{ height: '420px', width: '620px' }}>
        
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
            Login to user account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-400 hover:bg-red-600 text-white font-bold py-2 rounded-md transition duration-300"
            >
              Log in
            </button>

            {/* Signup Redirect */}
            <p className="text-sm text-gray-700 text-center">
              Don't have an account?{' '}
              <button
                onClick={formHandle1}
                className="text-red-600 hover:underline font-semibold transition duration-200"
              >
                Signup
              </button>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://milfordanimalvet.com/wp-content/uploads/2023/04/Wellness-Plans-Grooming-s3.jpg"
            alt="User login visual"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Ulogin;
