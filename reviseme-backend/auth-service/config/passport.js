// const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// module.exports = function(passport) {
//   // Local strategy
//   passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//     User.findOne({ email: email }, (err, user) => {
//       if (err) return done(err);
//       if (!user) return done(null, false, { message: 'That email is not registered' });

//       // Match password
//       if (!bcrypt.compareSync(password, user.password)) {
//         return done(null, false, { message: 'Password incorrect' });
//       }

//       return done(null, user);
//     });
//   }));

//   // Google strategy
//   passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   }, (accessToken, refreshToken, profile, done) => {
//     User.findOne({ googleId: profile.id }, async (err, user) => {
//       if (err) return done(err);
//       if (user) return done(null, user);

//       // Create a new user if not exist
//       const newUser = new User({
//         googleId: profile.id,
//         name: profile.displayName,
//         email: profile.emails[0].value
//       });
//       await newUser.save();
//       done(null, newUser);
//     });
//   }));

//   // Serialize and deserialize users
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => done(err, user));
//   });
// };
