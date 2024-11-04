const request = require('supertest');
const app = require('../server');

describe('FlashCard AI Controller', () => {
    it('should return a 400 error if prompt is missing', async () => {
        const response = await request(app)
            .post('/flashcards/generate')
            .send({});
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Prompt is required');
    });

    it('should generate flashcards for a valid prompt', async () => {
        const mockPrompt = 'Generate flashcards about JavaScript basics.';
        const response = await request(app)
            .post('/flashcards/generate')
            .send({ prompt: mockPrompt });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('aiResponse');
    });
});
