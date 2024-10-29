const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust path as needed

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5002/api/users/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const { id: googleId, displayName, emails } = profile;

    try {
        let user = await User.findUserByGoogleId(googleId);

        if (user) {
            return done(null, user);
        } else {
            user = {
                googleId,
                name: displayName,
                email: emails[0].value,
                password: null  // No password required for Google sign-in
            };
            const newUser = await User.addUser(user);
            return done(null, newUser);
        }
    } catch (err) {
        console.error('Error in Google strategy:', err);
        return done(err, null);
    }
}));

// Serialize user instance to store in session
passport.serializeUser((user, done) => {
    done(null, user.googleId || user._id);  // Use googleId or MongoDB _id
});

// Deserialize user instance from session data
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ googleId: id }) || await User.findById(id);
        done(null, user);
    } catch (err) {
        console.error('Error deserializing user:', err);
        done(err, null);
    }
});
