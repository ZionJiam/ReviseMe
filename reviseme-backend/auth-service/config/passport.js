const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserByGoogleId, addUser } = require('../userStore');  // Adjust path if needed

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;

    let user = findUserByGoogleId(id);
    if (user) {
        return done(null, user);
    } else {
        user = { googleId: id, name: displayName, email: emails[0].value };
        addUser(user);
        return done(null, user);
    }
}));

passport.serializeUser((user, done) => done(null, user.googleId));
passport.deserializeUser((googleId, done) => {
    const user = findUserByGoogleId(googleId);
    done(null, user);
});
