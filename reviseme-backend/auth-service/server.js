const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

// const authRoutes = require('./routes/authRoutes');


require('./config/passport')(passport);  // Configuring passport
require('dotenv').config();  // Loading environment variables

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));

// Middleware
// app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'  // or whatever your frontend's Docker service URL is
  }));


// Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',,
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

console.log('Connecting to MongoDB at:', MONGODB_URI);
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB', err));

// Routes
app.use(require('./routes/authRoutes'));

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

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, console.log(`Server started on port ${PORT}`));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

