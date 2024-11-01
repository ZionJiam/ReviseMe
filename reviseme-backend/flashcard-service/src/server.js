require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flashCardController = require('./controllers/flashCardController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const server = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/testDB';

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ILOVEYOU';
const cookieParser = require('cookie-parser');

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Enter Authentica JWT TOKEN');


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
      console.log("User DATA IS: " + user.userId);
      next();
    });
  };

console.log('Connecting to MongoDB at:', MONGODB_URI);

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
    apis: ['./src/controllers/flashCardController.js'],
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
// server.use('/flashcards', flashCardController);

// // Routes with authenticating of cookies
server.use('/flashcards', authenticateJWT, flashCardController);




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
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = server;