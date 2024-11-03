const request = require('supertest');
const express = require('express');
const flashCardAiController = require('./flashCardAiController');

const app = express();
app.use(express.json());
app.use('/flashcards', flashCardAiController);

describe('FlashCard AI Controller', () => {
    it('should create a new flashcard', async () => {
        const response = await request(app)
            .post('/flashcards')
            .send({
                question: 'What is AI?',
                answer: 'Artificial Intelligence'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should get all flashcards', async () => {
        const response = await request(app).get('/flashcards');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a flashcard by id', async () => {
        const response = await request(app).get('/flashcards/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
    });

    it('should update a flashcard by id', async () => {
        const response = await request(app)
            .put('/flashcards/1')
            .send({
                question: 'What is AI?',
                answer: 'Updated Answer'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('answer', 'Updated Answer');
    });

    it('should delete a flashcard by id', async () => {
        const response = await request(app).delete('/flashcards/1');
        expect(response.statusCode).toBe(204);
    });
});