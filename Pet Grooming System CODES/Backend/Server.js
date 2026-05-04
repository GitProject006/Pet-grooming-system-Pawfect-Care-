const express = require('express')
const cors = require('cors')
const app = express()
require('./db/config')
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5175"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}))
app.use('/api/auth',authRoutes)
app.use(adminRoutes,userRoutes)


app.listen(8000, (() => {
    console.log("port is 8000")
}))

