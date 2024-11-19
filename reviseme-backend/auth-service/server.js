// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from a .env file

// Initialize Express app
const app = express();

// Middleware to handle CORS and JSON payloads
app.use(cors({
  origin: ['http://localhost:3000'],  // Add your frontend URL here
  methods: ['GET', 'POST'],
}));
app.use(express.json());  // Middleware to parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Import and use auth routes
app.use('/api', require('./routes/authRoutes')); // Use the authRoutes.js file with /api prefix

// Route to fetch all users (for testing purposes)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users
    res.json(users);  // Send the list of users as JSON
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users: ' + err.message });
  }
});

// Health Check Route
app.get('/api/test', (req, res) => {
  res.send('Server is up and running');  // Simple route to check if the server is working
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
