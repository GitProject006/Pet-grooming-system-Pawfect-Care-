const userController = require("../controllers/userController");
const express = require("express");
const Router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

Router.post('/orderproduct', verifyToken, userController.orderbooking);
Router.get('/getproductbooking', verifyToken, userController.getProductBooking);
Router.get('/getbookings/:userId', verifyToken, userController.getProductBookingById);

Router.post('/bookgroom', verifyToken, userController.bookgroom);
Router.get('/getgroombooking', verifyToken, userController.getgroombooking);
Router.get('/getbookgroom/:userId', verifyToken, userController.getgroombookingbyid);

Router.post('/bookwellness', verifyToken, userController.bookwellness);
Router.get('/getwellnessbooking', verifyToken, userController.getwellnessbooking);
Router.get('/getbookwellness/:userId', verifyToken, userController.getbookwellnessbyid);

Router.post('/bookadditional', verifyToken, userController.bookadditional);
Router.get('/getadditionalbooking', verifyToken, userController.getadditionalbooking);
Router.get('/getbookadditional/:userId', verifyToken, userController.getbookadditionalbyid);

module.exports = Router;