const mongoose = require("mongoose");

const flashcardSetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashCard' }],
}, { timestamps: true });

module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);