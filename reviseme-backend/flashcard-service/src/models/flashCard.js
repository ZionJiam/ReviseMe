const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    flashcardSet: { type: mongoose.Schema.Types.ObjectId, ref: 'FlashcardSet' },
    bucket: { type: Number, default: 1 },
    next_review_date: { type: Date, default: Date.now },
    times_reviewed: { type: Number, default: 0 },
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically
module.exports = mongoose.model('FlashCard', flashCardSchema);
