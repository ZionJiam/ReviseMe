require('dotenv').config();
const express = require('express');
const flashCardAiController = require('./controllers/FlashcardAIController');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5010;
const SECRET_KEY = 'ILOVEYOU';

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Enter Authenticate JWT TOKEN');

    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        req.userId = user.userId;
        // Add userId to req.body
        req.body.userId = user.userId;
        console.log("User DATA IS: " + user.userId);
        next();
    });
};

// Middleware
server.use(bodyParser.json());
server.use(cookieParser());

// Setup CORS middleware with multiple allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001'];

server.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // Allow cookies to be sent with requests
}));

// Use JWT authentication for /flashcards routes
server.use('/flashcardsAI', authenticateJWT, flashCardAiController);

// Basic error handling
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Flashcard AI service running on port ${PORT}`);
});

module.exports = server;
