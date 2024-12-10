const express = require('express');
const router = express.Router();

let balance = 1000; // Số dư tài khoản

// Endpoint thực hiện chuyển tiền (bị lỗ hổng)
router.post('/CWE-352-transfer', (req, res) => {
    const amount = parseInt(req.body.amount || 0, 10);
    if (amount > 0) {
        balance -= amount;
        return res.send(`Transferred ${amount}. Remaining balance: ${balance}`);
    }
    res.status(400).send("Invalid amount");
});

module.exports = router;
