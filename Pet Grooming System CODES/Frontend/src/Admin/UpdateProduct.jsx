import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { useNavigate, useParams } from 'react-router-dom';
import Anavbar from './Anavbar';
import API from '../../api';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/getproduct/${id}`)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setImageURL(response.data.imageURL);
      })
      .catch(error => { console.error("Error fetching product:", error); });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API}/updateproduct/${id}`, { name, description, price, imageURL, category })
      .then(() => { alert("Product updated successfully"); navigate('/getproducts'); })
      .catch((error) => { console.error("Error updating product:", error); });
  };

  return (
    <div className='d-flex'>
      <Anavbar/>
      <br/>
      <h1 style={{fontSize:30}} className='text-center'>Edit Product</h1>
      <form onSubmit={handleSubmit} className="grooming-form mx-4">
        <div className="mb-4">
          <br/>
          <div><label className="block mb-1">Name:</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border border-gray-300 p-2 rounded-md w-full" /></div>
          <br/>
          <div><label>Price:</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="border border-gray-300 p-2 rounded-md w-full" /></div>
          <br/>
          <div><label>Category:</label><input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="border border-gray-300 p-2 rounded-md w-full" /></div>
          <br/>
          <div><label>Description:</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 p-2 rounded-md w-full" rows="4" required></textarea></div>
          <br/>
          <div><label>Image URL:</label><input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required className="border border-gray-300 p-2 rounded-md w-full" /></div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
