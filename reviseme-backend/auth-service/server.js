const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passport'); // Import Passport configuration

const app = express();

// Initialize sessions and Passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set to true for HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Define the Google Auth route
app.get('/auth/google', (req, res, next) => {
  console.log("Reached /auth/google route");
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Define the Google callback route
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');  // Redirect to home on success
    }
);

// Home route
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome, ${req.user.name}`);
    } else {
        res.send('Home Page. Please log in.');
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
