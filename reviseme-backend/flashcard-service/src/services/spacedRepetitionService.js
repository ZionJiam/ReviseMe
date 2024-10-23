const FlashCard = require('../models/flashCard');


class SpacedRepetitionService {
    updateReviewSchedule(flashcard, canRemember) {
        const now = new Date();
        const dayInMs = 24 * 60 * 60 * 1000;

        if (canRemember === 'Yes') {
            if (flashcard.bucket < 3) {
                flashcard.bucket += 1;
            }
        } else {
            flashcard.bucket = 1;
        }

        if (flashcard.bucket === 1) {
            flashcard.next_review_date = new Date(now.getTime() + dayInMs);
        } else if (flashcard.bucket === 2) {
            flashcard.next_review_date = new Date(now.getTime() + 3 * dayInMs);
        } else if (flashcard.bucket === 3) {
            flashcard.next_review_date = new Date(now.getTime() + 7 * dayInMs);
        }

        flashcard.times_reviewed += 1;
        return flashcard;
    }

    async getDueFlashcards() {
        const today = new Date();
        today.setHours(23, 59, 59, 59);
        return FlashCard.find({next_review_date: {$lte: today}});
    }
}

module.exports = new SpacedRepetitionService();