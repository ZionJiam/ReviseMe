const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('../models/User');
const People = require('../models/People');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'ILOVEYOU';



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

// ... other imports

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    const userId = user._id;

    if (!user) {
      return res.status(404).json({   
        message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });

    //Send the token as an HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: false, // Only send over HTTPS current false
      sameSite: 'Lax', // Prevent CSRF
      maxAge: 3600000, // 1 hour
    });


    res.status(200).json({message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
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
