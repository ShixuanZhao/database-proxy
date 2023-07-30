// routes/index.js
const express = require("express");
const app = express();
const router = express.Router();
const mysql = require("mysql");
const dbController = require("../controllers/dbController");
const config = require("../config"); // Import the configuration file

app.use(express.json());

connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

router.post("/:collection", (req, res) => {
  const collection = req.params.collection;
  const data = req.body;
  const query = `INSERT INTO ${collection} SET ?`;
  connection.query(query, data, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        console.error(`Duplicate entry in ${collection}:`, err);
        res.status(409).json({ error: "Duplicate Entry" });
      } else {
        console.error(`Error inserting data into ${collection}:`, err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      console.log(`Data inserted into ${collection} successfully`);
      res.status(200).json(result);
    }
  });
});

router.get("/:collection/:id", (req, res) => {
  const collection = req.params.collection;
  const id = req.params.id;
  const query = `SELECT * FROM ${collection} WHERE id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(`Error fetching data from ${collection}:`, err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        console.error(`Data not found in ${collection}`);
        res.status(404).json({ error: "Data not found" });
      } else {
        res.json(result[0]);
      }
    }
  });
});

router.put("/:collection/:id", (req, res) => {
  const collection = req.params.collection;
  const id = req.params.id;
  const data = req.body;
  const query = `UPDATE ${collection} SET ? WHERE id = ?`;
  connection.query(query, [data, id], (err, result) => {
    if (err) {
      console.error(`Error updating data in ${collection}:`, err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        console.error(`Data not found in ${collection}`);
        res.status(404).json({ error: "Data not found" });
      } else {
        console.log(`Data updated in ${collection} successfully`);
        res.status(200).json(result);
      }
    }
  });
});

router.delete("/:collection/:id", (req, res) => {
  const collection = req.params.collection;
  const id = req.params.id;
  const query = `DELETE FROM ${collection} WHERE id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(`Error deleting data from ${collection}:`, err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        console.error(`Data not found in ${collection}`);
        res.status(404).json({ error: "Data not found" });
      } else {
        console.log(`Data deleted from ${collection} successfully`);
        res.status(200).json(result);
      }
    }
  });
});

module.exports = router;
