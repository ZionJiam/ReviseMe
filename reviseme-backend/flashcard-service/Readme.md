Flashcard Service
=================

=================================

A RESTful API service for creating, reading, updating, and deleting flashcards.

Table of Contents
-----------------

*   [Features](#features)

*   [Technologies Used](#technologies-used)

*   [Getting Started](#getting-started)

*   [API Endpoints](#api-endpoints)

*   [Request/Response Format](#requestresponse-format)

*   [Error Handling](#error-handling)

*   [Testing](#testing)

*   [Code Structure](#code-structure)

*   [Contributing](#contributing)

*   [License](#license)

*   [References](#references)


Features
--------

*   Create new flashcards with Subjects, questions, answers and tags

*   Read all flashcards or retrieve a specific flashcard by ID

*   Update existing flashcards

*   Delete flashcards by ID


Technologies Used
-----------------

*   Node.js: JavaScript runtime environment

*   Express.js: Web framework for building RESTful APIs

*   MongoDB: NoSQL database for storing flashcard data

*   Mongoose: Object Data Modeling (ODM) library for MongoDB

*   Jest: Testing framework for JavaScript

*   Supertest: Testing library for HTTP requests


Getting Started
---------------

1.  Clone the repository: **git clone https://github.com/your-username/flashcard-service.git**

2.  Install dependencies: **npm install**

3.  Setup mongo database in local:
    *   **docker pull mongo**
    *   **docker run -d -p 27017-27019:27017-27019 --name mongodb mongo**
    *   Validate if everything is OK: **docker ps** 

4.  Install required packages
    **npm install joi**
    **npm install dotenv**       
    **npm install jest supertest --save-dev** 
    **npm install swagger-jsdoc swagger-ui-express** (for documentation)

5.  Start the service: **node src/server.js**

6.  Access the APP: **http://localhost:3000/flashcards**


API Endpoints
-------------

*   **GET /flashcards**: Retrieve all flashcards

*   **GET /flashcards/:id**: Retrieve a specific flashcard by ID

*   **POST /flashcards**: Create a new flashcard

*   **PUT /flashcards/:id**: Update an existing flashcard

*   **DELETE /flashcards/:id**: Delete a flashcard by ID


Request/Response Format
-----------------------

*   Request body: JSON

*   Response body: JSON


Error Handling
--------------

*   Error responses: JSON with error message and status code

*   Error codes:

    *   400: Bad Request

    *   404: Not Found

    *   500: Internal Server Error


Testing
-------

*   Unit tests: **npm test** or **jest**

*   Unit tests with Coverage: **npm test --coverage** or **jest --coverage**


Code Structure
--------------

*   **server.js**: Main application file

*   **controllers/**: Controller files for handling API requests

*   **models/**: Model files for interacting with MongoDB

*   **services/**: Service files for business logic

*   **tests/**: Test files for unit and integration testing


Contributing
------------

*   Fork the repository: **git fork https://github.com/your-username/flashcard-service.git**

*   Create a new branch: **git checkout -b feature/new-feature**

*   Make changes and commit: **git commit -m "Added new feature"**

*   Push changes: **git push origin feature/new-feature**

*   Open a pull request: **https://github.com/your-username/flashcard-service/pulls**



References
---------------

*   Node.js: https://nodejs.org/

*   Express.js: https://expressjs.com/

*   MongoDB: https://www.mongodb.com/

*   Mongoose: https://mongoosejs.com/

*   Jest: https://jestjs.io/

*   Supertest: https://github.com/visionmedia/supertest