// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Route for local login
// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

// // Route for Google authentication
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google/callback', passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'Dinesh0507'; // Load the secret key from environment variables

// Sign Up (Registration)
router.post('/signup', async (req, res) => {
  const { name, age, education, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, age, education, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user: ' + err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);  // Log any errors
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;
