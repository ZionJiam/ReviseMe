const FlashCard = require('../models/flashCard');
const FlashcardSet = require('../models/flashcardSet');

class FlashCardService {
    async findAll() {
        try {
            return await FlashCard.find()
        } catch (error) {
            throw new Error('Error finding flashcards');
        }
    }


    async findAllLTEToday() {
        try {
            const today = new Date();

            return await FlashCard.find({ next_review_date: { $lte: today } });
        } catch (error) {
            throw new Error('Error finding late flashcards');
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


    async findAllFlashcardSets() {
        try {
            return await FlashcardSet.find().populate('flashcards');
        } catch (error) {
            throw new Error('Error finding flashcard sets');
        }
    }

    async createFlashcardSet(data) {
        const flashcardSet = new FlashcardSet(data);
        return await flashcardSet.save();
    }

    async getFlashcardSet(id) {
        return await FlashcardSet.findById(id).populate('flashcards');
    }

    async updateFlashcardSet(id, data) {
        const flashcardSet = await FlashcardSet.findById(id);
        if (!flashcardSet) {
            throw new Error('FlashcardSet not found');
        }
        Object.assign(flashcardSet, data);
        return await flashcardSet.save();
    }

    async deleteFlashcardSet(id) {
        return FlashcardSet.findByIdAndDelete(id);
    }

    async deleteDueFlashcardSets() {
        return FlashcardSet.deleteMany({ name: "Due Flashcards" });
    }

    async addMultipleFlashCardsToSet(flashcardSetId, flashcardIds) {
        const flashcardSet = await FlashcardSet.findById(flashcardSetId);
        if (!flashcardSet) {
            throw new Error('FlashcardSet not found');
        }

        for (const flashcardId of flashcardIds) {
            if (flashcardSet.flashcards.includes(flashcardId)) {
                console.log(`FlashCard with ID ${flashcardId} already exists in the set`);
                continue;
            }
            const flashcard = await FlashCard.findById(flashcardId);
            if (!flashcard) {
                throw new Error(`FlashCard with ID ${flashcardId} not found`);
            }
            flashcardSet.flashcards.push(flashcard._id);
        }

        return await flashcardSet.save();
    }

    async removeMultipleFlashCardsFromSet(flashcardSetId, flashcardIds) {
        const flashcardSet = await FlashcardSet.findById(flashcardSetId);
        if (!flashcardSet) {
            throw new Error('FlashcardSet not found');
        }
        flashcardSet.flashcards = flashcardSet.flashcards.filter(id => !flashcardIds.includes(id.toString()));
        return await flashcardSet.save();
    }

    async createFlashcardSetWithDueCards() {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today

        const dueFlashcards = await FlashCard.find({ next_review_date: { $lte: today } });

        const flashcardSet = new FlashcardSet({
            name: "Due Flashcards",
            description: "Flashcards due for review today",
            flashcards: dueFlashcards.map(card => card._id)
        });

        // Save the flashcard set
        await flashcardSet.save();

        // Update the flashcards to reference the new set
        await FlashCard.updateMany(
            { _id: { $in: dueFlashcards.map(card => card._id) } },
            { flashcardSet: flashcardSet._id }
        );

        return flashcardSet;
    }
}

module.exports = new FlashCardService();