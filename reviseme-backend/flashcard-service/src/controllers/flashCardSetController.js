const express = require('express');
const router = express.Router();
const flashCardSetService = require('../services/flashCardSetService');
const flashCardService = require('../services/flashCardService');


// FlashCardSets APIs

/**
 * @swagger
 * /flashcardsSets/all:
 *   get:
 *     summary: Get all flashcard sets
 *     tags: [Flashcard Sets]
 *     responses:
 *       200:
 *         description: A list of flashcard sets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/flashcardSet'
 *       500:
 *         description: Internal server error
 */
router.get('/all', async (req, res) => {
    try {
        const flashcardSets = await flashCardSetService.findAllFlashcardSets();
        res.json(flashcardSets);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcardsSets:
 *   post:
 *     summary: Create a new flashcard set
 *     tags: [Flashcard Sets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Geography
 *               description:
 *                 type: string
 *                 example: Countries of the world
 *               flashcards:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [123, 456, 789]
 *     responses:
 *       201:
 *         description: Flashcard set created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashcardSet'
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
    try {
        const { name, description, userId, flashcards } = req.body;
        const createdFlashcards = await flashCardService.createFlashcards(flashcards, userId);
        const flashcardSet = await flashCardSetService.createFlashcardSet(name, description, userId, createdFlashcards);
        res.json(flashcardSet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


/**
 * @swagger
 * /flashcardsSets/{id}:
 *   get:
 *     summary: Get a flashcard set
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard set ID
 *     responses:
 *       200:
 *         description: Flashcard set found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashcardSet'
 *       404:
 *         description: Flashcard set not found
 */
router.get('/:id', async (req, res) => {
    try {
        const flashcardSet = await flashCardSetService.getFlashcardSet(req.params.id);
        res.json(flashcardSet);
    } catch (error) {
        res.status(404).json({ message: 'FlashcardSet not found' });
    }
});


/**
 * @swagger
 * /flashcardsSets/{id}:
 *   put:
 *     summary: Update a flashcard set
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard set ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Geography
 *               description:
 *                 type: string
 *                 example: Countries of the world
 *               flashcardIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [123, 456, 789]
 *     responses:
 *       200:
 *         description: Flashcard set updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashcardSet'
 *       500:
 *         description: Internal server error
 */
router.put('/:id', async (req, res) => {
    try {
        const flashcardSet = await flashCardSetService.updateFlashcardSet(req.params.id, req.body);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcardsSets/{id}:
 *   delete:
 *     summary: Delete a flashcard set
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard set ID
 *     responses:
 *       200:
 *         description: Flashcard set deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
    try {
        await flashCardSetService.deleteFlashcardSet(req.params.id);
        res.json({ message: 'FlashcardSet deleted' });
    } catch (error) {
        console.error('Error deleting flashcard set:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcardsSets:
 *   delete:
 *     summary: Delete all flashcard sets
 *     tags: [Flashcard Sets]
 *     responses:
 *       200:
 *         description: All flashcard sets deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/', async (req, res) => {
    try {
        await flashCardSetService.deleteAllFlashcardSets();
        res.json({ message: 'All flashcard sets deleted' });
    } catch (error) {
        console.error('Error deleting all flashcard sets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcardsSets/{id}/cards:
 *   post:
 *     summary: Add multiple flashcards to a set
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard set ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flashcardIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of flashcard IDs to add
 *     responses:
 *       200:
 *         description: Flashcard set updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashcardSet'
 *       500:
 *         description: Internal server error
 */
router.post('/:id/cards', async (req, res) => {
    try {
        const { flashcardIds } = req.body;
        const flashcardSet = await flashCardSetService.addMultipleFlashCardsToSet(req.params.id, flashcardIds);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcardsSets/{id}/cards:
 *   delete:
 *     summary: Remove multiple flashcards from a set
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard set ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flashcardIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of flashcard IDs to remove
 *     responses:
 *       200:
 *         description: Flashcard set updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashcardSet'
 *       500:
 *         description: Internal server error
 */
router.delete('/:id/cards', async (req, res) => {
    try {
        const { flashcardIds } = req.body;
        const flashcardSet = await flashCardSetService.removeMultipleFlashCardsFromSet(req.params.id, flashcardIds);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcardsSets/{id}/cards:
 *   delete:
 *     summary: Remove all flashcards from a set
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard set ID
 *     responses:
 *       200:
 *         description: Flashcard set updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashcardSet'
 *       500:
 *         description: Internal server error
 */
router.delete('/:id/cards/all', async (req, res) => {
    try {
        const flashcardSet = await flashCardSetService.removeAllFlashCardsFromSet(req.params.id);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcardsSets/{id}/user:
 *   post:
 *     summary: Associate a flashcard set with a user
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard set ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *                 required: true
 *     responses:
 *       200:
 *         description: Flashcard set associated with user
 *       500:
 *         description: Internal server error
 */
router.post('/:id/user', async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("Associating flashcard set with user:", req.params.id, userId);
        const flashcardSet = await flashCardSetService.associateFlashcardSetWithUser(userId,req.params.id);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /flashcardsSets/user/{userId}/cards:
 *   delete:
 *     summary: Remove all flashcards of a user
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: All flashcards of the user removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All flashcards of the user have been removed
 *       500:
 *         description: Internal server error
 */
router.delete('/user/:userId/cards', async (req, res) => {
    try {
        const result = await flashCardSetService.removeAllFlashCardsOfUser(req.params.userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcardsSets/user/{userId}:
 *   get:
 *     summary: Get all flashcard sets by user ID
 *     tags: [Flashcard Sets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of flashcard sets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FlashcardSet'
 *       500:
 *         description: Internal server error
 */

router.get('/user/:userId', async (req, res) => {
    try {
        const flashcardSets = await flashCardSetService.getAllFlashCardSetsByUserId(req.params.userId);
        res.json(flashcardSets);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/user', async (req, res) => {
    console.log("Entered here User")
    try {
        const flashcardSets = await flashCardSetService.getAllFlashCardSetsByUserId(req.userId);
        res.json(flashcardSets);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;