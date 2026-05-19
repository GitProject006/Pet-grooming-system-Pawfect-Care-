import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import API from './api';

const Asignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { name, email, password };
    axios
      .post(`${API}/api/auth/asignup`, payload)
      .then((result) => {
        alert('Account created');
        navigate('/alogin');
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create an account");
      });
  };

  let formHandle1 = (e) => {
    e.preventDefault();
    navigate("/alogin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-green-300 relative p-6">
      <Link to="/" className="absolute top-6 left-6 text-white bg-green-600 hover:bg-green-700 p-3 rounded-full shadow-lg transition-transform hover:scale-110" title="Go to Home">
        <FaSignOutAlt className="text-xl" />
      </Link>
      <div className="flex bg-white/30 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden" style={{ height: '440px', width: '620px' }}>
        <div className="w-1/2 hidden md:block">
          <img src="https://milfordanimalvet.com/wp-content/uploads/2023/04/Wellness-Plans-Grooming-s3.jpg" alt="Signup visual" className="object-cover h-full w-full" />
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Signup</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Password" />
            </div>
            <button type="submit" className="w-full bg-red-400 hover:bg-red-600 text-white font-bold py-2 rounded-md transition duration-300">Signup</button>
            <p className="text-center text-sm text-gray-700 pt-2">Already have an account?{' '}
              <button onClick={formHandle1} className="text-red-600 hover:underline font-semibold transition duration-200">Login</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Asignup;
