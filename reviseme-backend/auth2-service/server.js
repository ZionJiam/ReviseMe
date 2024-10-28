const express = require('express');
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = 5002;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware for JSON and CORS
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL
    credentials: true                // Allow cookies to be sent
}));

// Additional CORS headers for specific routes
const addCorsHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

// Log MongoDB connection URI
console.log('Connecting to MongoDB at:', MONGODB_URI);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB', err));

// Proxy Google authentication requests to the auth service on port 5003
app.use('/auth/google', createProxyMiddleware({ target: 'http://localhost:5003', changeOrigin: true }));
app.use('/auth/google/callback', createProxyMiddleware({ target: 'http://localhost:5003', changeOrigin: true }));

// Mount user routes with CORS headers
app.use('/api/users', addCorsHeaders, userRoutes);

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Main service running on http://localhost:${PORT}`);
});
