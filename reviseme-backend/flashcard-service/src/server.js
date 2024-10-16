require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flashCardController = require('./controllers/flashCardController');

const server = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';

// Middleware
server.use(bodyParser.json());

// Routes
server.use('/flashcards', flashCardController);

// MongoDB Connection
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
        console.log(`FlashCards Service is up and running on port: ${PORT}`);
    });
}).catch(err => {
    console.error('Connection error', err);
});

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Internal Server Error'});
});

module.exports = server;