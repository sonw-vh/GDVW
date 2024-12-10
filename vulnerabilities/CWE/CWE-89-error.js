const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT)");
    db.run("INSERT INTO products (name) VALUES ('Laptop')");
    db.run("INSERT INTO products (name) VALUES ('Phone')");
});

// Endpoint bị lỗ hổng Error-Based SQLi
router.get('/CWE-89-error', (req, res) => {
    const productId = req.query.id || '';
    const query = `SELECT * FROM products WHERE id = ${productId}`; // Lỗ hổng
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send(err.message); // Trả lỗi trực tiếp
        res.json(rows);
    });
});

module.exports = router;
