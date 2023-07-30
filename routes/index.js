// routes/index.js
const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const dbController = require('../controllers/dbController');

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123QWEasd425112!',
  database: 'proxy_db',
});

router.post('/:collection', (req, res) => {
    const collection = req.params.collection;
    const data = req.body;
    const query = `INSERT INTO ${collection} SET ?`;
    connection.query(query, data, (err, result) => {
      if (err) {
        console.error(`Error inserting data into ${collection}:`, err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log(`Data inserted into ${collection} successfully`);
        res.status(200).json(result);
      }
    });
});
  
router.get('/:collection/:id', (req, res) => {
    const collection = req.params.collection;
    const id = req.params.id;
    const query = `SELECT * FROM ${collection} WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) {
        console.error(`Error fetching data from ${collection}:`, err);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.json(result[0]);
        }
    });
});
  
router.put('/:collection/:id', (req, res) => {
    const collection = req.params.collection;
    const id = req.params.id;
    const data = req.body;
    const query = `UPDATE ${collection} SET ? WHERE id = ?`;
    connection.query(query, [data, id], (err, result) => {
      if (err) {
        console.error(`Error updating data in ${collection}:`, err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log(`Data updated in ${collection} successfully`);
        res.status(200).json(result);
      }
    });
});
  
router.delete('/:collection/:id', (req, res) => {
    const collection = req.params.collection;
    const id = req.params.id;
    const query = `DELETE FROM ${collection} WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error(`Error deleting data from ${collection}:`, err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log(`Data deleted from ${collection} successfully`);
        res.status(200).json(result);
      }
    });
});

module.exports = router;
  