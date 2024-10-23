const express = require('express');
const router = express.Router();
const spacedRepetitionService = require('../services/spacedRepetitionService');
const FlashCard = require('../models/flashCard');
const flashCardService = require('../services/flashCardService');


/**
 * @swagger
 * /flashcards/{id}/review:
 *   post:
 *     summary: Review a flashcard and update its review schedule
 *     tags: [Flashcards Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               performance:
 *                 type: string
 *                 example: 'good'
 *     responses:
 *       200:
 *         description: Next review date for the flashcard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nextReviewDate:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Flashcard not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/review', async (req, res) => {
    const { id } = req.params;
    const { performance } = req.body; // 'good' or 'bad'

    try {
        const flashcard = await FlashCard.findById(id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        const updatedFlashcard = spacedRepetitionService.updateReviewSchedule(flashcard, performance === 'good' ? 'Yes' : 'No');
        await updatedFlashcard.save();

        res.json({ nextReviewDate: updatedFlashcard.next_review_date });
    } catch (error) {
        console.error('Error updating flashcard review schedule:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcards/review/today:
 *   get:
 *     summary: Get flashcards that are due for review today
 *     tags: [Flashcards Review]
 *     responses:
 *       200:
 *         description: List of flashcards due for review today
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/review/today', async (req, res) => {
    try {
        const dueFlashcards = await spacedRepetitionService.getDueFlashcards();
        res.json(dueFlashcards);
    } catch (error) {
        console.error('Error fetching due flashcards:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/review/today/flashCardSet:
 *   get:
 *     summary: Get a flashcard set that contains flashcards that are due for review today
 *     tags: [Flashcards Review]
 *     responses:
 *       200:
 *         description: Flashcard set found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Internal server error
 */
router.get('/review/today/flashCardSet', async (req, res) => {
    try {
        await flashCardService.deleteDueFlashcardSets();
        let flashCardSetWithDueCards = await flashCardService.createFlashcardSetWithDueCards();
        flashCardSetWithDueCards= await flashCardService.getFlashcardSet(flashCardSetWithDueCards._id);
        res.json(flashCardSetWithDueCards);
    } catch (error) {
        console.error('Error fetching due flashCardSet:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/review/sorted-due-today:
 *   get:
 *     summary: Get sorted flashcards that are due for review today
 *     tags: [Flashcards Review]
 *     responses:
 *       200:
 *         description: List of sorted flashcards due for review today
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/review/sorted-due-today', async (req, res) => {
    try {
        const dueFlashcards = await spacedRepetitionService.getDueFlashcards();
        const sortedFlashcards = dueFlashcards.sort((a, b) => a.next_review_date - b.next_review_date);
        res.json(sortedFlashcards);
    } catch (error) {
        console.error('Error fetching sorted due flashcards:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;