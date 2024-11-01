const FlashCardService = require('./flashCardService');
const FlashCard = require('../models/flashCard');

jest.mock('../models/flashCard');

describe('FlashCardService', () => {
    describe('findAll', () => {
        it('should return all flashcards', async () => {
            const mockFlashCards = [
                { question: 'What is Node.js?', answer: 'JavaScript runtime' },
                { question: 'What is Express?', answer: 'Node.js web framework' }
            ];
            FlashCard.find.mockResolvedValue(mockFlashCards);

            const flashCards = await FlashCardService.findAll();
            expect(flashCards).toEqual(mockFlashCards);
        });
    });

    describe('findById', () => {
        it('should return a flashcard by ID', async () => {
            const mockFlashCard = { question: 'What is Node.js?', answer: 'JavaScript runtime' };
            FlashCard.findById.mockResolvedValue(mockFlashCard);

            const flashCard = await FlashCardService.findById('some-id');
            expect(flashCard).toEqual(mockFlashCard);
        });

        it('should return null if flashcard is not found', async () => {
            FlashCard.findById.mockResolvedValue(null);

            const flashCard = await FlashCardService.findById('some-id');
            expect(flashCard).toBeNull();
        });
    });

    describe('createFlashCard', () => {
        it('should create a new flashcard', async () => {
            const mockFlashCard = { question: 'What is Node.js?', answer: 'JavaScript runtime' };
            FlashCard.create.mockResolvedValue(mockFlashCard);

            const flashCard = await FlashCardService.createFlashCard({ question: 'What is Node.js?', answer: 'JavaScript runtime' });
            expect(flashCard).toEqual(mockFlashCard);
        });
    });

    describe('updateFlashCard', () => {
        it('should update a flashcard', async () => {
            const mockFlashCard = { question: 'What is Node.js?', answer: 'JavaScript runtime' };
            FlashCard.findOneAndUpdate.mockResolvedValue(mockFlashCard);

            const flashCard = await FlashCardService.updateFlashCard('some-id', { question: 'What is Node.js?', answer: 'JavaScript runtime' });
            expect(flashCard).toEqual(mockFlashCard);
        });
    });

    describe('deleteFlashCard', () => {
        it('should delete a flashcard', async () => {
            const mockFlashCard = { question: 'What is Node.js?', answer: 'JavaScript runtime' };
            FlashCard.findByIdAndDelete.mockResolvedValue(mockFlashCard);

            const flashCard = await FlashCardService.deleteFlashCard('some-id');
            expect(flashCard).toEqual(mockFlashCard);
        });
    });

});