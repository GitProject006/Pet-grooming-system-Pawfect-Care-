const authController = require("../controllers/authController")
const express = require("express")
const Router = express.Router()


Router.post('/asignup',authController.aSignup)
Router.post('/alogin',authController.aLogin)
Router.post('/usignup',authController.uSignup)
Router.post('/ulogin',authController.uLogin)


module.exports = Router