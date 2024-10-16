const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const flashCardController = require('./flashCardController');
const flashCardService = require('../services/flashCardService');

jest.mock('../services/flashCardService');

const app = express();
app.use(bodyParser.json());
app.use('/flashcards', flashCardController);

describe('FlashCardController', () => {
    describe('GET /flashcards/all', () => {
        it('should return all flashcards', async () => {
            const mockFlashCards = [{
                question: 'What is Node.js?',
                answer: 'JavaScript runtime'
            }, {question: 'What is Express?', answer: 'Node.js web framework'}];
            flashCardService.findAll.mockResolvedValue(mockFlashCards);

            const res = await request(app).get('/flashcards');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockFlashCards);
        });

        it('should handle errors', async () => {
            flashCardService.findAll.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).get('/flashcards');
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({message: 'Internal Server Error'});
        });
    });

    describe('GET /flashcards/:id', () => {
        it('should return a flashcard by ID', async () => {
            const mockFlashCard = {question: 'What is Node.js?', answer: 'JavaScript runtime'};
            flashCardService.findById.mockResolvedValue(mockFlashCard);

            const res = await request(app).get('/flashcards/some-id');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockFlashCard);
        });

        it('should return 404 if flashcard not found', async () => {
            flashCardService.findById.mockResolvedValue(null);

            const res = await request(app).get('/flashcards/some-id');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({message: 'Flashcard not found'});
        });

        it('should handle errors', async () => {
            flashCardService.findById.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).get('/flashcards/some-id');
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({message: 'Internal Server Error'});
        });
    });

    // Add more tests for POST, PUT, and DELETE routes

    describe('POST /flashcards', () => {
        it('should create a new flashcard', async () => {
            const mockFlashCard = {question: 'What is Node.js?', answer: 'JavaScript runtime'};
            flashCardService.createFlashCard.mockResolvedValue(mockFlashCard);

            const res = await request(app).post('/flashcards').send({
                question: 'What is Node.js?', answer: 'JavaScript runtime', subject: 'Node.js'
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(mockFlashCard);
        });
    });

    describe('POST /flashcards', () => {
        it('should handle errors', async () => {
            flashCardService.createFlashCard.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).post('/flashcards').send({
                question: 'What is Node.js?', answer: 'JavaScript runtime', subject: 'Node.js'
            });
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({message: 'Internal Server Error'});
        });
    });

    describe('POST /flashcards', () => {
        it('should handle Validation errors', async () => {
            flashCardService.createFlashCard.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).post('/flashcards').send({question: 'What is Node.js?'});
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('PUT /flashcards/:id', () => {
        it('should update a flashcard', async () => {
            const mockFlashCard = {question: 'What is Node.js?', answer: 'JavaScript runtime'};
            flashCardService.updateFlashCard.mockResolvedValue(mockFlashCard);

            const res = await request(app).put('/flashcards/some-id').send({
                question: 'What is Node.js?', answer: 'JavaScript runtime'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockFlashCard);
        });
    });

    describe('PUT /flashcards/:id', () => {
        it('should handle errors', async () => {
            flashCardService.updateFlashCard.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).put('/flashcards/some-id').send({
                question: 'What is Node.js?', answer: 'JavaScript runtime'
            });
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({message: 'Internal Server Error'});
        });
    });


    describe('DELETE /flashcards/:id', () => {
        it('should delete a flashcard', async () => {
            const mockFlashCard = {question: 'What is Node.js?', answer: 'JavaScript runtime'};
            flashCardService.deleteFlashCard.mockResolvedValue(mockFlashCard);

            const res = await request(app).delete('/flashcards/some-id');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({"message": "Deleted flashcard with ID: some-id"});
        });
    });

});