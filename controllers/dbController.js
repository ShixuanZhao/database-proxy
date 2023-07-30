// controllers/dbController.js
const fs = require('fs');
const mysql = require('mysql');
const config = require('../config'); // Import the configuration file

let connection;

module.exports = {
  initializeSchema: () => {
    connection = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });

    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
      }
      console.log('Connected to MySQL database');
      createTables();
    });
  },
};

// Helper function to create tables based on the schema
function createTables() {
  const schemaFile = fs.readFileSync('./models/schema.json', 'utf8');
  const schema = JSON.parse(schemaFile);

  Object.entries(schema).forEach(([tableName, columns]) => {
    const columnsArr = Object.entries(columns).map(([columnName, columnType]) => {
      return `${columnName} ${columnType}`;
    });
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsArr.join(', ')})`;
    connection.query(query, (err) => {
      if (err) {
        console.error(`Error creating table ${tableName}:`, err);
      } else {
        console.log(`Table ${tableName} created successfully`);
      }
    });
  });
}
