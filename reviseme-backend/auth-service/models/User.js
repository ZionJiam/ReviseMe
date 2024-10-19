// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   googleId: { type: String, unique: true, sparse: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },  // Not required because Google OAuth users won't have passwords
//   name: { type: String, required: true }
// });

// // Password hashing middleware for local users
// userSchema.pre('save', function(next) {
//   if (this.isModified('password')) {
//     const salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
//   }
//   next();
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
