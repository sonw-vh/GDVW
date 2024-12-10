const express = require('express');
const router = express.Router();

const HARD_CODED_PASSWORD = 'admin123'; // Mật khẩu mã hóa cứng

router.post('/CWE-798', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === HARD_CODED_PASSWORD) {
        res.send('Welcome, admin!');
    } else {
        res.status(403).send('Invalid credentials.');
    }
});

module.exports = router;
