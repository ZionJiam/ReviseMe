const mongoose = require("mongoose");

const flashcardSetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlashCard' }],
}, { timestamps: true });

module.exports = mongoose.model('FlashcardSet', flashcardSetSchema);

flashcardSetSchema.pre('save', function (next) {
    if (!this.userId) { // Check if userId is not already set
      this.userId = req.session.userId; // Assuming userId is in the session
    }
    next(); // Continue with the save operation
  });