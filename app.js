// app.js
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

const dbController = require('./controllers/dbController');
const routes = require('./routes');

app.use(express.json());
app.use(morgan('dev'));

// Initialize database schema on server startup
dbController.initializeSchema();

app.use('/api', routes);

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
