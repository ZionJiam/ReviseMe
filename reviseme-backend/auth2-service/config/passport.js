const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const SECRET_KEY = process.env.JWT_SECRET || 'ILOVEYOU';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5002/api/users/google/callback"  // Updated URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id: googleId, displayName, emails } = profile;

      // Check if the user exists in the database
      let user = await User.findOne({ googleId });
      if (!user) {
        // Create new user if not exists
        user = new User({
          googleId,
          name: displayName,
          email: emails[0].value,
          password: null // Password is not required for Google-authenticated users
        });
        await user.save();
      }

      // Pass the user object to the callback
      done(null, user);
    } catch (error) {
      console.error('Error in Google Strategy:', error);
      done(error, null);
    }
  }
));

// Required for persistent login sessions
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
