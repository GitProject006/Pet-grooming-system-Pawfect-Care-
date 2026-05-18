import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Anavbar from './Anavbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";
import API from '../../api';

const GetGroom = () => {
  const [groomingServices, setGroomingServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroomingServices = async () => {
      try {
        const response = await axios.get(`${API}/getgroom`);
        setGroomingServices(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroomingServices();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const deleteproduct = (id) => {
    axios.delete(`${API}/deletegrooming/${id}`)
      .then(() => {
        alert("service deleted successfully");
        window.location.assign('/getgroom');
      })
      .catch((error) => {
        console.error('Error in deleting : ', error);
      });
  };

  return (
    <div>
      <Anavbar/>
      <br/>
      <div style={{display:"flex", justifyContent:"flex-end", marginRight:"50px"}}>
        <button onClick={() => {navigate('/groom')}} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Service</button>
      </div>
      <div className="card-container">
        {groomingServices.map((i) =>
          <div className="card" key={i._id}>
            <div className="card-content">
              <h2 className="card-title" style={{display:"flex", justifyContent:"center", fontSize:"30px"}}>{i.name}</h2>
              <p><strong>Price:</strong>{i.price}</p>
              <p><strong>includesBath:</strong>{i.includesBath ? "yes" : "no"}</p>
              <p><strong>includesHairTrimming:</strong>{i.includesHairTrimming ? "yes" : "no"}</p>
              <p><strong>includesNailTrimming:</strong>{i.includesNailTrimming ? "yes" : "no"}</p>
              <p><strong>includesEarCleaning:</strong>{i.includesEarCleaning ? "yes" : "no"}</p>
              <p><strong>includesTeethBrushing:</strong>{i.includesTeethBrushing ? "yes" : "no"}</p>
              <p className="card-description"><strong style={{color:"black"}}>Description:</strong>{i.description.slice(0,100)}...</p>
            </div>
            <br/>
            <div className="card-actions" style={{display:"flex"}}>
              <Link to={`/updategroom/${i._id}`}><FaEdit color='blue'/></Link>
              <button onClick={() => {deleteproduct(i._id)}}><FaTrash color='red'/></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetGroom;
