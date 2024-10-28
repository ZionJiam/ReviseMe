const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserByGoogleId, addUser } = require('../userStore');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5003/auth/google/callback"  // Adjust PORT if needed
}, async (accessToken, refreshToken, profile, done) => {
    const { id: googleId, displayName, emails } = profile;

    try {
        // Find user by Google ID
        let user = await findUserByGoogleId(googleId);
        
        if (user) {
            // User exists
            return done(null, user);
        } else {
            // User does not exist, create a new one
            user = {
                googleId,
                name: displayName,
                email: emails[0].value,
                password: null  // No password required for Google sign-in
            };
            const newUser = await addUser(user);
            return done(null, newUser);
        }
    } catch (err) {
        console.error('Error in Google strategy:', err);
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => done(null, user.googleId || user._id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserByGoogleId(id) || await User.findById(id);
        done(null, user);
    } catch (err) {
        console.error('Error in deserialization:', err);
        done(err, null);
    }
});
