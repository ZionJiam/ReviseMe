const express = require('express');
const router = express.Router();
const flashCardService = require('../services/flashCardService');

/**
@swagger
tags:
    - name: FlashCards
    - description: FlashCards API
*/
/**
 * @swagger
 * /flashcards/all:
 *   get:
 *     summary: Retrieve a list of flashcards
 *     tags: [Flashcards]
 *     responses:
 *       200:
 *         description: A list of flashcards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './models/flashCard'
 */
// Get all flashcards
router.get('/all', async (req, res) => {
    console.log('Attempting to get all flashcards');
    try {
        const flashCards = await flashCardService.findAll();
        console.log('Successfully retrieved all flashcards');
        res.json(flashCards);
    } catch (error) {
        console.error('Error getting all flashcards:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcards/{id}:
 *   get:
 *     summary: Retrieve a flashcard by ID
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard ID
 *     responses:
 *       200:
 *         description: A flashcard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashCard'
 *       404:
 *         description: Flashcard not found
 */
// Get a flashcard by ID
router.get('/:id', async (req, res) => {
    console.log(`Attempting to get flashcard with ID: ${req.params.id}`);
    try {
        const flashCard = await flashCardService.findById(req.params.id);
        if (!flashCard) {
            console.warn(`Flashcard with ID: ${req.params.id} not found`);
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        console.log(`Successfully retrieved flashcard with ID: ${req.params.id}`);
        res.json(flashCard);
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            console.warn(`Invalid ID format for flashcard: ${req.params.id}`);
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        console.error('Error getting flashcard by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcards:
 *   post:
 *     summary: Create a new flashcard
 *     tags: [Flashcards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               question:
 *                 type: string
 *                 example: What is the capital of France?
 *               answer:
 *                 type: string
 *                 example: The capital of France is Paris.
 *               subject:
 *                 type: string
 *                 example: Geography
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Geography, Europe]
 *     responses:
 *       201:
 *         description: Flashcard created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 question:
 *                   type: string
 *                   example: What is the capital of France?
 *                 answer:
 *                   type: string
 *                   example: The capital of France is Paris.
 *                 subject:
 *                   type: string
 *                   example: Geography
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [Geography, Europe]
 *       400:
 *         description: Invalid request
 */
// Create a new flashcard
const Joi = require('joi');
const flashCardSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    subject: Joi.string().required(),
    tags: Joi.array().items(Joi.string())
});

router.post('/', async (req, res) => {
    console.log('Attempting to create a new flashcard');
    const { error } = flashCardSchema.validate(req.body);
    if (error) {
        console.error('Validation error:', error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const flashCard = await flashCardService.createFlashCard(req.body);
        console.log('Successfully created a new flashcard');
        res.status(201).json(flashCard);
    } catch (error) {
        console.error('Error creating flashcard:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/{id}:
 *   put:
 *     summary: Update a flashcard
 *     tags: [Flashcards]
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
 *               question:
 *                 type: string
 *                 example: What is the capital of France?
 *               answer:
 *                 type: string
 *                 example: The capital of France is Paris.
 *               subject:
 *                 type: string
 *                 example: Geography
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Geography, Europe]
 *     responses:
 *       200:
 *         description: Flashcard updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/flashCard'
 *       404:
 *         description: Flashcard not found
 */
// Update a flashcard
router.put('/:id', async (req, res) => {
    console.log(`Attempting to update flashcard with ID: ${req.params.id}`);
    try {
        const flashCard = await flashCardService.updateFlashCard(req.params.id, req.body);
        if (!flashCard) {
            console.warn(`Flashcard with ID: ${req.params.id} not found`);
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        console.log(`Successfully updated flashcard with ID: ${req.params.id}`);
        res.json(flashCard);
    } catch (error) {
        console.error('Error updating flashcard:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/{id}:
 *   delete:
 *     summary: Delete a flashcard
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Flashcard ID
 *     responses:
 *       200:
 *         description: Flashcard deleted
 *       404:
 *         description: Flashcard not found
 */
// Delete a flashcard
router.delete('/:id', async (req, res) => {
    console.log(`Attempting to delete flashcard with ID: ${req.params.id}`);
    try {
        const deletedFlashCard = await flashCardService.deleteFlashCard(req.params.id);
        if (!deletedFlashCard) {
            console.warn(`Flashcard with ID: ${req.params.id} not found`);
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        console.log(`Successfully deleted flashcard with ID: ${req.params.id}`);
        res.json({ message: `Deleted flashcard with ID: ${req.params.id}` });
    } catch (error) {
        console.error('Error deleting flashcard:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// FlashCardSets APIs

/**
 * @swagger
 * /flashcards/sets/all:
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
router.get('/sets/all', async (req, res) => {
    try {
        const flashcardSets = await flashCardService.findAllFlashcardSets();
        res.json(flashcardSets);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/sets:
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
 *               flashcardIds:
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
router.post('/sets/', async (req, res) => {
    try {
        const flashcardSet = await flashCardService.createFlashcardSet(req.body);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/sets/{id}:
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
router.get('/sets/:id', async (req, res) => {
    try {
        const flashcardSet = await flashCardService.getFlashcardSet(req.params.id);
        res.json(flashcardSet);
    } catch (error) {
        res.status(404).json({ message: 'FlashcardSet not found' });
    }
});


/**
 * @swagger
 * /flashcards/sets/{id}:
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
router.put('/sets/:id', async (req, res) => {
    try {
        const flashcardSet = await flashCardService.updateFlashcardSet(req.params.id, req.body);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/sets/{id}:
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
router.delete('/sets/:id', async (req, res) => {
    try {
        await flashCardService.deleteFlashcardSet(req.params.id);
        res.json({ message: 'FlashcardSet deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /flashcards/sets/{id}/cards:
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
router.post('/sets/:id/cards', async (req, res) => {
    try {
        const { flashcardIds } = req.body;
        const flashcardSet = await flashCardService.addMultipleFlashCardsToSet(req.params.id, flashcardIds);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /flashcards/sets/{id}/cards:
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
router.delete('/sets/:id/cards', async (req, res) => {
    try {
        const { flashcardIds } = req.body;
        const flashcardSet = await flashCardService.removeMultipleFlashCardsFromSet(req.params.id, flashcardIds);
        res.json(flashcardSet);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;