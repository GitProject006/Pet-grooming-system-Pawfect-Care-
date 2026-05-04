import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { useNavigate, useParams } from 'react-router-dom';
import Anavbar from './Anavbar';


const UpdateProduct = ({ productId }) => {
  const [product, setProduct] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:8000/getproduct/${id}`)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setImageURL(response.data.imageURL);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error in fetching product:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { name, description, price, imageURL, category };

    axios.put(`http://localhost:8000/updateproduct/${id}`, formData)
      .then(() => {
        alert("Product updated successfully");
      navigate('/getproducts')
      })
      .catch((error) => {
        console.error("Error in updating product:", error);
      });
  };

  return (
    <div className='d-flex'>
      <Anavbar/>
      <br/>
      <h1 style={{"fontSize":30}} className='text-center'>Edit Product</h1>
      <form onSubmit={handleSubmit} className="grooming-form mx-4">
        <div className="mb-4">
            <br/>
            <div>
              <label className="block mb-1">Name:</label>
              <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} required className="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <br/>
            <div>
              <label >Price:</label>
              <input type="number" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} required className="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <br/>
            <div>
              <label >Category:</label>
              <input type="text" name="duration" value={category} onChange={(e) => { setCategory(e.target.value) }} required className="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <br/>
            <div>
              <label >Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                className="border border-gray-300 p-2 rounded-md w-full"
                rows="4"
                required
              ></textarea>
            </div>
            <br/>
            <div>
              <label>Image URL:</label>
              <input type="text" name="duration" value={imageURL} onChange={(e) => { setImageURL(e.target.value) }} required className="border border-gray-300 p-2 rounded-md w-full" />
            </div>
          </div>
         
        {/* <label>Name:</label>
        <input type="text" name="name" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} required />

        <label>Description:</label>
        <textarea name="description" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>

        <label>Price:</label>
        <input type="number" name="price" placeholder='Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />

        <label>Category:</label>
        <input type="text" name="category" placeholder='Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />

        <label>Image Url:</label>
        <input type="text" name="imageURL" placeholder='ImgUrl' value={imageURL} onChange={(e) => { setImageURL(e.target.value) }} />

        <br /> */}
        <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Product</button>
          </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
