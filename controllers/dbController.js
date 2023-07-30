// controllers/dbController.js
const fs = require('fs');
const mysql = require('mysql');

let connection;

module.exports = {
  initializeSchema: () => {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123QWEasd425112!',
      database: 'proxy_db',
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
