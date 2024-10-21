require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flashCardController = require('./controllers/flashCardController');
const flashCardSetController = require('./controllers/flashCardSetController');
const reviewController = require('./controllers/reviewController');
const groupsController = require('./controllers/groupsController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const server = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flashcards';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FlashCards API',
            version: '1.0.0',
            description: 'FlashCards Service API documentation',
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
    },
    apis: ['ReviseMe/reviseme-backend/flashcard-service/src/controllers/flashCardController.js',
    'ReviseMe/reviseme-backend/flashcard-service/src/controllers/flashCardSetController.js',
    'ReviseMe/reviseme-backend/flashcard-service/src/controllers/groupsController.js',
    'ReviseMe/reviseme-backend/flashcard-service/src/controllers/reviewController.js']
};
const swaggerDocs = swaggerJsDoc(options);


// Middleware
server.use(bodyParser.json());
server.use(cookieParser());

server.use(cors({
    origin: 'http://localhost:3000',  // or whatever your frontend's Docker service URL is
    credentials: true                 // Allow cookies to be sent
  }));

// Routes with NO authenticating of cookies

// // Routes with authenticating of cookies
server.use('/flashcards', authenticateJWT, flashCardController);


server.use('/flashcards', flashCardController, reviewController);


// Swagger route
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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