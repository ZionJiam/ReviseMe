const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    subject: { type: String, required: true },
    tags: { type: [String], default: [] },
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('FlashCard', flashCardSchema);