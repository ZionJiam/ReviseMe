const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Make password optional
  googleId: { type: String, unique: true }, // Add googleId field
  profilePhoto: { type: String } // Optional: store profile photo if needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
