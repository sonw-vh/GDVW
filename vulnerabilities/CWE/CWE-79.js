const express = require('express');
const router = express.Router();

let comments = []; // Lưu trữ bình luận trong bộ nhớ

// Endpoint xử lý POST request
router.post('/CWE-79', (req, res) => {
    const comment = req.body.comment || '';
    comments.push(comment);
    res.send("Comment stored successfully!");
});

// Endpoint hiển thị bình luận (GET request)
router.get('/CWE-79', (req, res) => {
    let html = '<h1>Stored Comments</h1>';
    comments.forEach(c => {
        html += `<p>${c}</p>`; // Không xử lý input => lỗ hổng XSS
    });
    res.send(html);
});

module.exports = router;
