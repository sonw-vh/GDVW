const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("INSERT INTO users (username, password) VALUES ('admin', 'password123')");
    db.run("INSERT INTO users (username, password) VALUES ('user', 'userpass')");
});

// Endpoint bị lỗ hổng Union-Based SQLi
router.get('/CWE-89-union', (req, res) => {
    const search = req.query.search || '';
    const query = `SELECT username FROM users WHERE username = '${search}'`; // Lỗ hổng
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send('Database Error');
        res.json(rows);
    });
});

module.exports = router;
