import React, { useState } from "react";
import axios from "axios";
import "./admin.css";
import Anavbar from "./Anavbar";

const Products = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, description, price, imageURL, category };

    axios
      .post("http://localhost:8000/products", formData)
      .then(() => {
        alert("Data added successfully");
      })
      .catch((error) => {
        console.error("Error in adding:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Anavbar />
      <br />
      <div className="flex justify-center items-start py-10">
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Product
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Price */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description:
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category:
              </label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Image URL */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL:
              </label>
              <input
                type="text"
                name="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;
