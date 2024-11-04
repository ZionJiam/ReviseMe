// flashcard-ai-service/controllers/FlashcardAIController.js
const express = require('express');
const router = express.Router();
const flashCardAiService = require('../services/FlashcardAIService');

// POST route to generate flashcards using AI and store them in the database
router.post('/generate', async (req, res) => {
    const { prompt, name, description, userId } = req.body; // Include additional fields

    if (!prompt || !name || !description || !userId) {
        return res.status(400).json({ message: 'Prompt, name, description, and userId are required' });
    }

    try {
        // Generate flashcards using AI service
        const aiResponse = await flashCardAiService.flashCardAi({ prompt });
        const { flashcards } = aiResponse; // Extract flashcards from AI response

        // // POST the generated flashcards to the flashcard microservice to store them
        // const response = await axios.post('http://localhost:5000/flashcards', { 
        //     name, 
        //     description, 
        //     userId, 
        //     flashcards 
        // });

        // Return the response from the flashcard microservice

        // Log the flashcards to see their structure
        console.log('Generated Flashcards:', flashcards);

        // If you want to log each individual flashcard
        flashcards.forEach((flashcard, index) => {
            console.log(`Flashcard ${index + 1}:`, flashcard);
        });

        res.status(200).json(flashcards);

    } catch (error) {
        console.error('Error generating or storing flashcards:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
