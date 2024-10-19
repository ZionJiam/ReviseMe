const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  secondname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const People = mongoose.model('People', userSchema);

module.exports = People;
