import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Unavbar from './Unavbar';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import QRCode from "react-qr-code";
import { FaDownload } from 'react-icons/fa';
import Footer from '../Components/Footer';
import API from '../api';

function Mybookings() {
  const [items, setItems] = useState([]);  
  const [groom, setGroom] = useState([]);  
  const [wellness, setWellness] = useState([]);  
  const [additional, setAdditional] = useState([]);  
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  const pdref = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    if (user) {
      axios.get(`${API}/getbookings/${user.id}`, config)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
      axios.get(`${API}/getbookgroom/${user.id}`, config)
        .then((response) => {
          setGroom(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
      axios.get(`${API}/getbookwellness/${user.id}`, config)
        .then((response) => {
          setWellness(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
      axios.get(`${API}/getbookadditional/${user.id}`, config)
        .then((response) => {
          setAdditional(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks: ', error);
        });
    }
  }, []);

  const calculateStatus = (bookingDate) => {
    const currentDate = new Date();
    const formattedBookingDate = new Date(bookingDate);
    const diffTime = Math.abs(currentDate - formattedBookingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? 'completed' : 'upcoming';
  };

  const calculateStatus1 = (bookingDate) => {
    const currentDate = new Date();
    const formattedBookingDate = new Date(bookingDate);
    const diffTime = Math.abs(currentDate - formattedBookingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 5 ? 'on the way' : 'delivered';
  };

  const preloadImages = (item) => {
    const imagePromises = [];
    imagePromises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.src = `${API}/organizer/${item.templeImage}`;
        img.onload = () => resolve(img);
      })
    );
    return Promise.all(imagePromises);
  };

  const downloadpdf = async () => {
    if (!selectedCard) return;
    await preloadImages(selectedCard);
    const input = pdref.current;
    const options = { scale: 2, useCORS: true };
    html2canvas(input, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a2', true);
      pdf.setProperties({ title: 'My Booking', subject: 'Booking Details' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`booking_${selectedCard._id.slice(0, 10)}.pdf`);
    });
  };

  return (
    <div style={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
      <Unavbar />
      <div style={{flex:"1"}}>
        <h1 className='text-center text-3xl py-5'>Products Bookings</h1>
        <div>
          {items.map((item) => (
            <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }} ref={pdref}>
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
      </div>
      <div style={{flex:"1"}}>
        <h1 className='text-center text-3xl py-5'>Grooming Bookings</h1>
        <div>
          {groom.map((item) => (
            <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }} ref={pdref}>
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
      </div>
      <div style={{flex:"1"}}>
        <h1 className='text-center text-3xl py-5'>Wellness Bookings</h1>
        <div>
          {wellness.map((item) => (
            <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }} ref={pdref}>
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
      </div>
      <div style={{flex:"1"}}>
        <h1 className='text-center text-3xl py-5'>Additional Bookings</h1>
        <div>
          {additional.map((item) => (
            <Card key={item._id} style={{ width: '90%', marginLeft: '65px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', paddingTop: '15px', marginBottom: '35px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }} ref={pdref}>
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
      </div>
      <Footer/>
    </div>
  );
}

export default Mybookings;
