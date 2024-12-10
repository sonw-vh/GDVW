const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const sequelize = new Sequelize('sqlite::memory:');
const Product = sequelize.define('product', {
    name: Sequelize.STRING,
    category: Sequelize.STRING,
    price: Sequelize.INTEGER,
});

sequelize.sync().then(() => {
    Product.bulkCreate([
        { name: 'Laptop', category: 'Electronics', price: 1000 },
        { name: 'Phone', category: 'Electronics', price: 500 },
        { name: 'Table', category: 'Furniture', price: 200 },
    ]);
});

// Route for ORM-based SQL Injection
router.get('/CWE-89-orm-dynamic-query', async (req, res) => {
    const category = req.query.category || '';
    const query = `SELECT * FROM products WHERE category = '${category}'`; // Lỗ hổng
    try {
        const results = await sequelize.query(query);
        res.json(results[0]);
    } catch (err) {
        res.status(500).send('Database error');
    }
});

module.exports = router;
