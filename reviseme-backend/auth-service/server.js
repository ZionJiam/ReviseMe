const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);  // Configuring passport
require('dotenv').config();  // Loading environment variables

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require('./routes/authRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
