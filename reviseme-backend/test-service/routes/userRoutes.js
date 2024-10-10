const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user (POST)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// Get all users (GET)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
