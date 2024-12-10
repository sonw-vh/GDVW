const express = require('express');
const router = express.Router();

router.get('/CWE-74', (req, res) => {
    const xForwardedFor = req.headers['x-forwarded-for'] || 'unknown';
    res.send(`Your IP is: ${xForwardedFor}`); // Không xác thực header
});

module.exports = router;
