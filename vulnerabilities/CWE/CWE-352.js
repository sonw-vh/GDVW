const express = require('express');
const router = express.Router();

let balance = 1000; // Số dư tài khoản giả lập

// Endpoint thực hiện chuyển tiền (bị lỗ hổng)
router.post('/CWE-352', (req, res) => {
    const amount = parseInt(req.body.amount || 0, 10);
    if (amount <= 0) {
        return res.status(400).send("Invalid amount");
    }
    balance -= amount; // Không kiểm tra CSRF Token
    res.send(`Transferred ${amount} successfully. Remaining balance: ${balance}`);
});

// Endpoint kiểm tra số dư
router.get('/CWE-352', (req, res) => {
    res.send(`Your balance is ${balance}`);
});

module.exports = router;
