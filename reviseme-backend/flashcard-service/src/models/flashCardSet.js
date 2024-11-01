const mongoose = require("mongoose");

const flashcardSetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashCard' }],
    groupIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    userId: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);