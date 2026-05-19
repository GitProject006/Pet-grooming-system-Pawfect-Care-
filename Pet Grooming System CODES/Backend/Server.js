const express = require('express')
const cors = require('cors')
const app = express()
require('./db/config')
const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require('./routes/userRoutes')
app.use(express.json())

app.use(cors({
   origin: "https://pet-grooming-system-pawfect-care.vercel.app",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}))
app.use('/api/auth',authRoutes)
app.use(adminRoutes,userRoutes)


const PORT = process.env.PORT || 8000
app.listen(PORT, (() => {
    console.log(`port is ${PORT}`)
}))
