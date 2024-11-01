const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: String,
    ownerId: String,  // The user who created the group
    members: [String], // Array of user IDs (users in the group)
    decks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' }],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);