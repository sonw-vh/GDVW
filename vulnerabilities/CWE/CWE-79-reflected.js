const express = require('express');
const router = express.Router();

// Endpoint bị lỗ hổng Reflected XSS
router.get('/CWE-79-reflected', (req, res) => {
    const name = req.query.name || '';
    res.send(`<h1>Hello, ${name}</h1>`); // Không xử lý input => lỗ hổng XSS
});

module.exports = router;
