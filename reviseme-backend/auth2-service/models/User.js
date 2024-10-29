const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional password for non-OAuth users
    googleId: { type: String, unique: true }, // Google OAuth ID
    // profilePhoto: { type: String } // Optional: store profile photo if needed
});

// Static method to find a user by Google ID
userSchema.statics.findUserByGoogleId = async function(googleId) {
    try {
        return await this.findOne({ googleId });
    } catch (error) {
        console.error('Error finding user by Google ID:', error);
        throw error;
    }
};

// Static method to add a new user
userSchema.statics.addUser = async function(userData) {
    try {
        const newUser = new this(userData);
        return await newUser.save();
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            console.error('Duplicate key error: A user with this email or Google ID already exists');
            throw new Error('A user with this email or Google ID already exists.');
        } else {
            console.error('Error adding new user:', error);
            throw error;
        }
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
