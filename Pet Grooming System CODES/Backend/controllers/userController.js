const userbooking = require("../models/User/MyBookings")
const groombooking = require("../models/User/GroomBooking")
const wellnessbooking = require('../models/User/WellnessBooking')
const additionalbooking = require('../models/User/AdditonalBooking')

const orderbooking = async (req, res) => {
    const { name, email, phno, description, price, category, productName, imageURL,
         totalamount, OrderdDate, userId, userName, quantity } = req.body;

    try {
        const order = new userbooking({ name, email, phno, description,
         price, category, productName, imageURL, totalamount, OrderdDate, userId, userName, quantity });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create' });
    }
}

const getProductBooking = async (req, res) => {
    try {
        const tasks = await userbooking.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

const getProductBookingById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await userbooking.find({ userId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

const  bookgroom =  async (req, res) => {
    try {
        const booking = new groombooking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
}

const getgroombooking =  async (req, res) => {
    try {
        const tasks = await groombooking.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

const getgroombookingbyid =  async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await groombooking.find({ userId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

const bookwellness = async (req, res) => {
    try {
        const booking = new wellnessbooking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
}

const getwellnessbooking = async (req, res) => {
    try {
        const tasks = await wellnessbooking.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

const getbookwellnessbyid = async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await wellnessbooking.find({ userId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

const bookadditional = async (req, res) => {
    try {
        const booking = new additionalbooking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
}

const getadditionalbooking = async (req, res) => {
    try {
        const tasks = await additionalbooking.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

const getbookadditionalbyid =  async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await additionalbooking.find({ userId }).sort('position');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
}

module.exports = {orderbooking,getProductBooking,getProductBookingById,
                  bookgroom,getgroombooking,getgroombookingbyid,
                  bookwellness,getwellnessbooking,getbookwellnessbyid,
                  bookadditional,getadditionalbooking,getbookadditionalbyid}