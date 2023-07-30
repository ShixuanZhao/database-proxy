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
<br> &emsp;&emsp;index.js &emsp;# Defines the router supporting CRUD operations including the error handling
<br> &emsp;tests
<br> &emsp;&emsp; dbController.test.js &emsp;# Contains unit tests for the dbController
<br> &emsp;package.json &emsp;# Project dependencies and scripts
<br> &emsp;config.js
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
<br> To enhance security and improve maintainability, I choose to read the database information like host and password from a configuration file instead of hardcoding it directly in the code.
## Testing
The application includes unit tests for the dbController, using the Mocha testing framework. <br>To run the tests, use the following command:&ensp;npm test
<br>The tests are defined in the dbController.test.js file inside the tests directory.
## Logging
The application uses Morgan for logging HTTP requests. <br>Request logs will be printed to the console during server execution.
## Future Development
We need to make additional changes if the application were intended to run in a concurrent environment to ensure the application's performance, scalability, and safety. I just list several changes for example:
<br> &emsp;1. Connection Pooling: Implement connection pooling for the database to efficiently manage and reuse database connections. This helps reduce the overhead of creating and closing connections for each request, especially in a concurrent environment with multiple client requests.
<br> &emsp;2. Handling Concurrent Requests: Ensure that the application can handle multiple concurrent requests without any conflicts or data corruption. We can use synchronization mechanisms like mutexes or semaphores to prevent race conditions when accessing shared resources.
<br> &emsp;3. Asynchronous Operations: Utilize asynchronous programming patterns, such as async/await or Promises, to handle non-blocking I/O operations and avoid blocking the event loop.
<br> &emsp;4. Load Balancing: If running the application on multiple instances or nodes, consider implementing load balancing to distribute incoming requests evenly across the nodes. This helps in better utilization of resources and improved performance.
<br> &emsp;5. Caching: Implement caching mechanisms to cache frequently accessed data and reduce the load on the database. This can help improve response times and overall performance in a concurrent environment.
<br> &emsp;6. Monitoring: Implement monitoring and logging to track the application's performance, identify bottlenecks, and detect potential issues in a concurrent environment.

