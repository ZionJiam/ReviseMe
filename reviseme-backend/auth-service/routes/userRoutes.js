const express = require('express');
const router = express.Router();
const User = require('../models/User');
const People = require('../models/People');

const bcrypt = require('bcryptjs');


// POST route to register a user
router.post('/register', async (req, res) => {

  const { name, email, password } = req.body;
  try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
          name,
          email,
          password: hashedPassword
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Get all users (GET)
router.get('/people', async (req, res) => {
  try {
    const users = await People.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching People', error:error.message });
  }
});

// Get all users (GET)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error:error.message });
  }
});

module.exports = router;
