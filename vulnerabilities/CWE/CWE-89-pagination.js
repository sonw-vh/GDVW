const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, description TEXT)");
    db.run("INSERT INTO products (name, description) VALUES ('Laptop', 'High-end gaming laptop')");
    db.run("INSERT INTO products (name, description) VALUES ('Phone', 'Latest smartphone')");
    db.run("INSERT INTO products (name, description) VALUES ('Tablet', 'Portable and powerful')");
});

router.get('/CWE-89-pagination', (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page || '1');
    const limit = 2;
    const offset = (page - 1) * limit;

    const query = `SELECT * FROM products WHERE name LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`; // Lỗ hổng
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send('Database Error');
        }
        res.json(rows);
    });
});

module.exports = router;
