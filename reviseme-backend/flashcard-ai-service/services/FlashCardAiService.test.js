const flashCardAiService = require('../services/FlashcardAIService');
const OpenAI = require('openai');

jest.mock('openai');

describe('flashCardAiService', () => {
    it('should generate AI response for a valid prompt', async () => {
        const mockAiResponse = 'JavaScript is a programming language.';
        const mockCompletion = {
            choices: [{ message: { content: mockAiResponse } }],
        };

        OpenAI.prototype.chat = {
            completions: { create: jest.fn().mockResolvedValue(mockCompletion) },
        };

        const response = await flashCardAiService.flashCardAi({ prompt: 'JavaScript' });
        expect(response.aiResponse).toEqual(mockAiResponse);
    });

    it('should throw an error if OpenAI API fails', async () => {
        OpenAI.prototype.chat = {
            completions: { create: jest.fn().mockRejectedValue(new Error('OpenAI API Error')) },
        };

        await expect(flashCardAiService.flashCardAi({ prompt: 'JavaScript' }))
            .rejects
            .toThrow('Unable to generate flashcards');
    });
});
