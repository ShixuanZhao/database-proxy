# Database Proxy - Node.js

This is a simple Node.js application that acts as a generic database proxy, providing a REST API for CRUD operations on a SQL database. The application uses Express and MySQL to handle the HTTP requests and interact with the database. For
## Project Structure
database-proxy
<br> &emsp; app.js &emsp;# The entry point of the application
<br> &emsp; controllers
<br> &emsp;&emsp;dbController.js &emsp;# Handles the database operations
<br> &emsp; models
<br> &emsp;&emsp;schema.json &emsp;# Defines the schema of the database
<br> &emsp;routes
<br> &emsp;&emsp;index.js &emsp;# Defines the router supporting CRUD operations
<br> &emsp;tests
<br> &emsp;&emsp; dbController.test.js &emsp;# Contains unit tests for the dbController
<br> &emsp;package.json &emsp;# Project dependencies and scripts
<br> &emsp;README.md &emsp;# Project documentation
## Getting Started
npm start
<br>The server will start running at http://localhost:4000.
## Endpoints
The API provides the following endpoints for CRUD operations:
<br>POST /:collection: Create a new row in the specified collection. Like: http://localhost:4000/api/users
<br>GET /:collection/:id: Get a row from the specified collection by ID. Like: http://localhost:4000/api/users/1
<br>PUT /:collection/:id: Update a row in the specified collection by ID.
<br>DELETE /:collection/:id: Delete a row from the specified collection by ID.
<br>The :collection parameter in the endpoints represents the name of the table in the database.
## Database Schema
The database schema is defined in the schema.json file inside the models directory. <br>The application will ingest this schema file on every server startup and create the necessary tables in the database if they do not exist.
## Testing
The application includes unit tests for the dbController, using the Mocha testing framework. <br>To run the tests, use the following command:npm test
<br>The tests are defined in the dbController.test.js file inside the tests directory.
## Logging
The application uses Morgan for logging HTTP requests. <br>Request logs will be printed to the console during server execution.
