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

*   Delete all flashcards

*   Sort flashcards by due date

*   Get flashcards that are due for review today
  
*   Get a flashcard set that contains flashcards that are due for review today

*   Get sorted flashcards that are due for review today

*   Get Group by ID
  
*   Get all Groups

*   Review flashcards and update their review schedule

*   Add Deck to Group

*   Remove Deck from Group

*   Share Deck with Group

*   Remove Group

*   Remove User from Group

*   Add User to Group


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

4.  Start the service: **node src/server.js**

5.  Access the APP: **http://localhost:3000/flashcards**

Quick Start
-----------

To quickly start using the API, follow these steps:

```sh
Start the server
node server.js

# Create a new flashcard
curl -X POST http://localhost:3000/flashcards -d '{"question": "What is Node.js?", "answer": "A JavaScript runtime environment."}'

# Retrieve all flashcards
curl -X GET http://localhost:3000/flashcards/all
```

API Endpoints
-------------
### Flashcards

- **GET /flashcards/all**: Retrieve a list of all flashcards
- **GET /flashcards/{id}**: Retrieve a flashcard by ID
- **POST /flashcards**: Create a new flashcard
- **PUT /flashcards/{id}**: Update a flashcard by ID
- **DELETE /flashcards/{id}**: Delete a flashcard by ID
- **DELETE /flashcards**: Delete all flashcards

### Flashcard Sets

- **GET /flashcardsSets/all**: Retrieve a list of all flashcard sets
- **POST /flashcardsSets**: Create a new flashcard set
- **GET /flashcardsSets/{id}**: Retrieve a flashcard set by ID
- **PUT /flashcardsSets/{id}**: Update a flashcard set by ID
- **DELETE /flashcardsSets/{id}**: Delete a flashcard set by ID
- **DELETE /flashcardsSets**: Delete all flashcard sets
- **POST /flashcardsSets/{id}/cards**: Add multiple flashcards to a set
- **DELETE /flashcardsSets/{id}/cards**: Remove multiple flashcards from a set
- **DELETE /flashcardsSets/{id}/cards/all**: Remove all flashcards from a set
- **DELETE /flashcardsSets/user/{userId}/cards**: Remove all flashcard set from a user
- **GET /flashcardsSets/user/{userId}/cards**: Get all flashcard sets by user ID

### Review

- **POST /review/{id}/review**: Review a flashcard and update its review schedule
- **GET /review/today**: Get flashcards that are due for review today
- **GET /review/sorted-due-today**: Get sorted flashcards that are due for review today
- **GET /review/today/flashCardSet**: Get a flashcard set that contains flashcards that are due for review today

### Groups

- **GET /groups**: Retrieve a list of all groups
- **POST /groups**: Create a new group
- **POST /groups/groupId/invite**: Invite a user to a group
- **DELETE /groups/groupId/remove**: Remove a user from a group
- **GET /groups/{id}**: Retrieve a group by ID
- **PUT /groups/{id}**: Update a group by ID
- **DELETE /groups/{id}**: Delete a group by ID
- **DELETE /groups**: Delete all groups

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