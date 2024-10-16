const FlashCard = require('../models/flashCard');

class FlashCardService {
    async findAll() {
        try {
            return await FlashCard.find();
        } catch (error) {
            throw new Error('Error finding flashcards');
        }
    }

    async findById(id) {
        try {
            return await FlashCard.findById(id);
        } catch (error) {
           return null;
        }
    }

    async createFlashCard(data) {
        try {
            return await FlashCard.create(data);
        } catch (error) {
            throw new Error('Error creating flashcard');
        }
    }

    async updateFlashCard(id, data) {
        try {
            return await FlashCard.findOneAndUpdate(
                { _id: id },
                { $set: data },
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error('Error updating flashcard');
        }
    }

    async deleteFlashCard(id) {
        try {
            return await FlashCard.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting flashcard');
        }
    }
}

module.exports = new FlashCardService();