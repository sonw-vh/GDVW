const express = require('express');
const router = express.Router();

const USERS = [{ username: 'admin', password: 'password123' }];

router.post('/CWE-287', (req, res) => {
    const { username, password } = req.body;
    if (username === 'bypass' || USERS.some(user => user.username === username && user.password === password)) {
        res.send('Login successful!');
    } else {
        res.status(403).send('Invalid credentials.');
    }
});

module.exports = router;
