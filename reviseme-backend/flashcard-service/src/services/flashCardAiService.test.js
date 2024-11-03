const OpenAI = require('openai');
const flashCardAiService = require('./flashCardAiService');

jest.mock('openai');

describe('flashCardAiService', () => {
    describe('flashCardAi', () => {
        it('should return AI response for a given prompt', async () => {
            const mockPrompt = 'What is Node.js?';
            const mockAiResponse = 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.';
            const mockCompletion = {
                choices: [
                    {
                        message: {
                            content: mockAiResponse,
                        },
                    },
                ],
            };

            OpenAI.prototype.chat = {
                completions: {
                    create: jest.fn().mockResolvedValue(mockCompletion),
                },
            };

            const data = { prompt: mockPrompt };
            const context = {};

            const result = await flashCardAiService.flashCardAi(data, context);

            expect(result.aiResponse).toEqual(mockAiResponse);
        });

        it('should handle errors from OpenAI API', async () => {
            const mockPrompt = 'What is Node.js?';
            const mockError = new Error('OpenAI API error');

            OpenAI.prototype.chat = {
                completions: {
                    create: jest.fn().mockRejectedValue(mockError),
                },
            };

            const data = { prompt: mockPrompt };
            const context = {};

            await expect(flashCardAiService.flashCardAi(data, context)).rejects.toThrow('Unable to generate flashcards');
        });
    });
});