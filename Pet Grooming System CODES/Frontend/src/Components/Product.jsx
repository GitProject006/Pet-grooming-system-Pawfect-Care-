import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit,  FaTrash } from "react-icons/fa";
import '../Admin/servicess.css'
import Navbar from './Navbar';


function Product() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getproducts`)
      .then((response) => {
        const taskData = response.data;
        console.log('Fetched events:', taskData);
        setItems(taskData);
      })
      .catch((error) => {
        console.error('Error fetching: ', error);
      });
  }, []);

  
  return (
   <div>
    <Navbar/>
    <br/>
    <h1 style={{display:"flex",justifyContent:"center",fontSize:'35px'}}>Products</h1>
    <div className="card-container">
    {items.slice(0,8).map((i)=>
        <div className="card" key={i._id}>
            <img src={i.imageURL}  className="card-image" style={{width:"100%",height:"250px"}} />
            <hr/>
            <br/>
            <div className="card-content" >
                <h2 className="card-title">{i.name}</h2>
                <p><strong>Price:</strong>{i.price}</p>
                <p><strong>Category:</strong>{i.category}</p>
                <p className="card-description"><strong style={{color:"black"}}>Description:</strong>{i.description.slice(0,100)}...</p>
            </div>
            <br/>
        </div>
    )}
</div>
  </div>
  );
}

export default Product;
