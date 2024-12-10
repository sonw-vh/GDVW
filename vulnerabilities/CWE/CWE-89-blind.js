const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT)");
    db.run("INSERT INTO users (username) VALUES ('admin')");
    db.run("INSERT INTO users (username) VALUES ('user')");
});

// Endpoint bị lỗ hổng Blind SQLi
router.get('/CWE-89-blind', (req, res) => {
    const username = req.query.username || '';
    const query = `SELECT * FROM users WHERE username = '${username}'`; // Lỗ hổng
    setTimeout(() => {
        db.all(query, [], (err, rows) => {
            if (err) return res.status(500).send('Database Error');
            res.json(rows);
        });
    }, username.includes('admin') ? 5000 : 0); // Tăng thời gian phản hồi nếu truy vấn thành công
});

module.exports = router;
