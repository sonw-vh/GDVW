const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT)");
    db.run("CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, product TEXT)");
    db.run("INSERT INTO users (username) VALUES ('admin')");
    db.run("INSERT INTO orders (user_id, product) VALUES (1, 'Laptop')");
});

// Route for SQL Injection in JOIN
router.get('/CWE-89-sql-join', (req, res) => {
    const username = req.query.username || '';
    const query = `
        SELECT orders.product 
        FROM orders 
        JOIN users ON users.id = orders.user_id 
        WHERE users.username = '${username}'`; // Lỗ hổng
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send('Database error');
        res.json(rows);
    });
});

module.exports = router;
