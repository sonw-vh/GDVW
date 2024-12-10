const express = require('express');
const router = express.Router();

let balance = 1000; // Số dư tài khoản

router.post('/CWE-352-cross-origin', (req, res) => {
    const amount = parseInt(req.body.amount || 0, 10);
    balance -= amount;
    res.send(`Transferred ${amount}. Remaining balance: ${balance}`);
});

module.exports = router;
