const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
// const peopleRoutes = require('./routes/peopleRoutes');


const app = express();
const PORT = 5002;
const MONGODB_URI = process.env.MONGODB_URI;



// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // or whatever your frontend's Docker service URL is
    credentials: true                 // Allow cookies to be sent
  }));

// Create a middleware function to add CORS headers
const addCorsHeaders = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,   PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();   

};

console.log('Connecting to MongoDB at:', MONGODB_URI);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB', err));

// Mount the routes with /api/users prefix
// app.use('/api/users', userRoutes);
app.use('/api/users', addCorsHeaders, userRoutes);


// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

