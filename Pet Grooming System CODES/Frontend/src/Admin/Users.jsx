import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Card } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';
import QRCode from "react-qr-code";
import API from '../../api';

const Users = () => {
  const [items, setItems] = useState([]);
  const [groom, setGroom] = useState([]);
  const [wellness, setWellness] = useState([]);
  const [additional, setAdditional] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  useEffect(() => {
    axios.get(`${API}/users`)
      .then((response) => { setUsers(response.data); })
      .catch((error) => { console.error(error); });
  }, []);

  const deleteData = (taskId) => {
    axios.delete(`${API}/userdelete/${taskId}`);
    window.location.assign('/users');
    alert('User is deleted');
  };

  const fetchUserBikeData = (userId) => {
    axios.get(`${API}/getbookings/${userId}`)
      .then((response) => { setItems(response.data); })
      .catch((error) => { console.error('Error fetching:', error); });
    axios.get(`${API}/getbookgroom/${userId}`)
      .then((response) => { setGroom(response.data); })
      .catch((error) => { console.error('Error fetching:', error); });
    axios.get(`${API}/getbookwellness/${userId}`)
      .then((response) => { setWellness(response.data); })
      .catch((error) => { console.error('Error fetching:', error); });
    axios.get(`${API}/getbookadditional/${userId}`)
      .then((response) => { setAdditional(response.data); toggleDetails(); })
      .catch((error) => { console.error('Error fetching:', error); });
  };

  const calculateStatus = (date) => {
    const currentDate = new Date();
    const formattedDate = new Date(date);
    return formattedDate >= currentDate ? "Upcoming" : "Completed";
  };

  const calculateStatus1 = (date) => {
    const currentDate = new Date();
    const formattedDate = new Date(date);
    const diffDays = Math.ceil(Math.abs(currentDate - formattedDate) / (1000 * 60 * 60 * 24));
    return diffDays >= 5 ? 'on the way' : 'delivered';
  };

  return (
    <div>
      <Anavbar/>
      <br />
      <h1 className='text-center text-3xl'>Users</h1><br />
      <div style={{display:"flex", justifyContent:"center"}}>
        <Table className="table-auto w-minwidth border-2 border-gray-400">
          <thead className='border'>
            <tr>
              <th className="border-2 border-gray-400 px-4 py-2">sl/no</th>
              <th className="border-2 border-gray-400 px-4 py-2">UserId</th>
              <th className="border-2 border-gray-400 px-4 py-2">User name</th>
              <th className="border-2 border-gray-400 px-4 py-2">Email</th>
              <th className="border-2 border-gray-400 px-4 py-2">Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td className="border-2 border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{item._id}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{item.name}</td>
                <td className="border-2 border-gray-400 px-4 py-2">{item.email}</td>
                <td className="border-2 border-gray-400 px-4 py-2">
                  <button style={{ border: 'none', background: 'none' }}>
                    <Link to={`/useredit/${item._id}`} style={{ color: 'blue', textDecoration: 'none' }}><FaEdit /></Link>
                  </button>
                  <button onClick={() => deleteData(item._id)} style={{ border: 'none', color: 'red', background: 'none' }}><FaTrash /></button>
                  <Button onClick={() => fetchUserBikeData(item._id)} className="mt-4 bg-blue-600 text-white" style={{height:"35px", width:"60px", borderRadius:"10px"}}>view</Button>
                  <div style={{ display: 'flex' }}>
                    {showDetails && (
                      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
                        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
                        <div className="bg-white p-4 rounded-lg z-10 relative" style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                          <div style={{flex:"1"}}>
                            <h1 className='text-center text-blue-300 text-4xl'>User Bookings</h1>
                            <h1 className='text-center text-3xl py-5'>Products Bookings</h1>
                            {items.map((item) => (
                              <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                  <div><img src={item.imageURL} style={{ height: '80px' }} /></div>
                                  <div><p>BookingId:</p><p>{item._id.slice(0, 10)}</p></div>
                                  <div><p>Product Name:</p><p>{item.productName}</p></div>
                                  <div><p>BookingDate</p><p>{item.OrderdDate}</p></div>
                                  <div><p>Quantity</p><p>{item.quantity}</p></div>
                                  <div><p>Price</p><p>₹{item.totalamount}</p></div>
                                  <div><p>Status</p><p>{calculateStatus1(item.OrderdDate)}</p></div>
                                </div>
                              </Card>
                            ))}
                          </div>
                          <div style={{flex:"1"}}>
                            <h1 className='text-center text-3xl py-5'>Grooming Bookings</h1>
                            {groom.map((item) => (
                              <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                  <div><img src={item.imageURL} style={{ height: '80px' }} /></div>
                                  <div><QRCode size={86} value={item._id.slice(0, 10)} viewBox={`0 0 256 256`} /></div>
                                  <div><p>BookingId:</p><p>{item._id.slice(0, 10)}</p></div>
                                  <div><p>Service Name:</p><p>{item.ServiceName}</p></div>
                                  <div><p>BookingDate</p><p>{item.date.slice(0,10)}</p></div>
                                  <div><p>Slot Timing</p><p>{item.time}</p></div>
                                  <div><p>Price</p><p>₹{item.totalamount}</p></div>
                                  <div><p>Status</p><p>{calculateStatus(item.OrderdDate)}</p></div>
                                </div>
                              </Card>
                            ))}
                          </div>
                          <div style={{flex:"1"}}>
                            <h1 className='text-center text-3xl py-5'>Wellness Bookings</h1>
                            {wellness.map((item) => (
                              <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                  <div><img src={item.imageURL} style={{ height: '80px' }} /></div>
                                  <div><QRCode size={86} value={item._id.slice(0, 10)} viewBox={`0 0 256 256`} /></div>
                                  <div><p>BookingId:</p><p>{item._id.slice(0, 10)}</p></div>
                                  <div><p>Service Name:</p><p>{item.ServiceName}</p></div>
                                  <div><p>BookingDate</p><p>{item.date.slice(0,10)}</p></div>
                                  <div><p>Slot Timing</p><p>{item.time}</p></div>
                                  <div><p>Price</p><p>₹{item.totalamount}</p></div>
                                  <div><p>Status</p><p>{calculateStatus(item.OrderdDate)}</p></div>
                                </div>
                              </Card>
                            ))}
                          </div>
                          <div style={{flex:"1"}}>
                            <h1 className='text-center text-3xl py-5'>Additional Bookings</h1>
                            {additional.map((item) => (
                              <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                  <div><img src={item.imageURL} style={{ height: '80px' }} /></div>
                                  <div><QRCode size={86} value={item._id.slice(0, 10)} viewBox={`0 0 256 256`} /></div>
                                  <div><p>BookingId:</p><p>{item._id.slice(0, 10)}</p></div>
                                  <div><p>Service Name:</p><p>{item.ServiceName}</p></div>
                                  <div><p>BookingDate</p><p>{item.date.slice(0,10)}</p></div>
                                  <div><p>Slot Timing</p><p>{item.time}</p></div>
                                  <div><p>Price</p><p>₹{item.totalamount}</p></div>
                                  <div><p>Status</p><p>{calculateStatus(item.OrderdDate)}</p></div>
                                </div>
                              </Card>
                            ))}
                          </div>
                          <Button onClick={toggleDetails} className="mt-4 bg-red-600 text-white" style={{height:"40px", width:"60px", borderRadius:"10px"}}>Close</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
