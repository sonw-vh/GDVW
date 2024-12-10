const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Tạo cơ sở dữ liệu SQLite giả lập
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, description TEXT)");
    db.run("INSERT INTO products (name, description) VALUES ('Laptop', 'High-end gaming laptop')");
    db.run("INSERT INTO products (name, description) VALUES ('Phone', 'Latest smartphone model')");
});

// Endpoint bị lỗ hổng
router.get('/CWE-89', (req, res) => {
    const search = req.query.search || '';
    const query = `SELECT * FROM products WHERE name = '${search}'`; // Lỗ hổng: không kiểm tra input
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send("Database Error");
        }
        res.json(rows);
    });
});

module.exports = router;
