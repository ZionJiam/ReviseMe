const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy({
    clientID: "your_google_client_id",
    clientSecret: "your_google_client_secret",
    callbackURL: "http://localhost:5003/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
      console.log("Authenticated user profile:", profile);
      done(null, profile);
  }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      res.send("Authentication Successful");
  }
);

app.listen(5003, () => {
    console.log("Test server running on http://localhost:5003");
});
