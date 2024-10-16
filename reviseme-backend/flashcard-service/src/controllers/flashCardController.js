const express = require('express');
const router = express.Router();
const flashCardService = require('../services/flashCardService');

// Get all flashcards
router.get('', async (req, res) => {
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

module.exports = router;