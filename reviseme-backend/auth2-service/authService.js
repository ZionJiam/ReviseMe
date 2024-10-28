const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = 5002;

// Configure session (adjust secret and options as needed)
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',  // Use the environment variable for the secret
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: "", // Use hardcoded values or environment variables
    clientSecret: "",
    callbackURL: "http://localhost:5003/auth/google/callback"},
  (accessToken, refreshToken, profile, done) => {
      console.log("Authenticated user profile:", profile);
      done(null, profile); // Normally you would find or create the user in your DB here
  }
));

// Passport session handling
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Define routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.send("Authentication Successful")
);

// Start server
app.listen(5003, () => {
    console.log("Authentication service running on http://localhost:5003");
});
