const users = [];  // Temporary in-memory store for users

// Find a user by Google ID
function findUserByGoogleId(googleId) {
    return users.find(user => user.googleId === googleId);
}

// Add a new user to the in-memory store
function addUser(user) {
    users.push(user);
}

module.exports = { findUserByGoogleId, addUser };
