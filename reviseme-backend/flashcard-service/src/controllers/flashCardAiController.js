const express = require('express');
const router = express.Router();
const flashCardAiService = require('../services/flashCardAiService'); // Adjust the path if necessary

/**
 * @swagger
 * /flashcards/generate:
 *   post:
 *     summary: Generate flashcards using OpenAI
 *     tags: [Flashcards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Generate flashcards about JavaScript basics.
 *     responses:
 *       200:
 *         description: Successfully generated flashcards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 aiResponse:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */

// Endpoint to generate flashcards
router.post('/generate', async (req, res) => {
    const { prompt } = req.body;

    // Validate the input
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    try {
        const aiResponse = await flashCardAiService.flashCardAi({ prompt });
        res.status(200).json(aiResponse);
    } catch (error) {
        console.error('Error generating flashcards:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
