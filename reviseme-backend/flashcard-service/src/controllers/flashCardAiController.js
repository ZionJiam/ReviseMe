const express = require('express');
const router = express.Router();
const flashCardAiService = require('../services/flashCardAiService'); // Ensure this path is correct
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // or use diskStorage if you want to save files on disk
const upload = multer({ storage });

/**
 * @swagger
 * /flashcards/upload:
 *   post:
 *     summary: Upload flashcard files
 *     tags: [Flashcards]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */
router.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const files = req.files; // The uploaded files

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Process files (e.g., read content and generate flashcards)
        // You can integrate your OpenAI service here to process the file contents
        
        res.status(200).json({ message: 'Files uploaded successfully', files });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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
