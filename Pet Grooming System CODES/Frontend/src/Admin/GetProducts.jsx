import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";
import Anavbar from './Anavbar';
import './servicess.css';
import API from '../../api';

function GetProducts() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/getproducts`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching: ', error);
      });
  }, []);

  const deleteproduct = (id) => {
    axios.delete(`${API}/deleteproducts/${id}`)
      .then(() => {
        alert("product deleted successfully");
        window.location.assign('/getproducts');
      })
      .catch((error) => {
        console.error('Error in deleting : ', error);
      });
  };

  return (
    <div>
      <Anavbar/>
      <h1 className='text-center text-4xl'>Products</h1>
      <div style={{display:"flex", justifyContent:"flex-end", marginRight:"50px"}}>
        <button onClick={() => {navigate('/products')}} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Service</button>
      </div>
      <div className="card-container">
        {items.map((i) =>
          <div className="card" key={i._id}>
            <img src={i.imageURL} className="card-image" style={{width:"100%", height:"250px"}} />
            <hr/>
            <br/>
            <div className="card-content">
              <h2 className="card-title">{i.name}</h2>
              <p><strong>Price:</strong>{i.price}</p>
              <p><strong>Category:</strong>{i.category}</p>
              <p className="card-description"><strong style={{color:"black"}}>Description:</strong>{i.description.slice(0,100)}...</p>
            </div>
            <div className="card-actions" style={{display:"flex"}}>
              <Link to={`/updateproduct/${i._id}`}><FaEdit color='blue'/></Link>
              <button onClick={() => {deleteproduct(i._id)}}><FaTrash color='red'/></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetProducts;
