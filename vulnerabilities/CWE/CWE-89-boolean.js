const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE accounts (id INTEGER PRIMARY KEY, username TEXT, balance INTEGER)");
    db.run("INSERT INTO accounts (username, balance) VALUES ('admin', 10000)");
    db.run("INSERT INTO accounts (username, balance) VALUES ('user', 5000)");
});

// Endpoint bị lỗ hổng Boolean-Based SQLi
router.get('/CWE-89-boolean', (req, res) => {
    const username = req.query.username || '';
    const query = `SELECT * FROM accounts WHERE username = '${username}'`; // Lỗ hổng
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send('Database Error');
        res.json(rows);
    });
});

module.exports = router;
