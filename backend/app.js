const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Route Imports
const AuthRouter = require("./routes/AuthRouter");
const HostRouter = require("./routes/HostRouter");
const storeRouter = require("./routes/storeRouter");
const GuestRouter = require("./routes/GuestRouter");


// CORS Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files (for images)
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// API Routes
app.use('/api', AuthRouter);
app.use('/api/host', HostRouter);
app.use('/api/guest', GuestRouter);
app.use('/api', storeRouter);


// Database Connection
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/hostel_booking";


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(" MongoDB Connected");
    app.listen(PORT, () => {
      console.log(` REST API running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(" MongoDB Connection Error:", err);
  });
