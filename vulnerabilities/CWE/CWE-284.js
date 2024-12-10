const express = require('express');
const router = express.Router();

let sensitiveData = "This is sensitive data only for admins.";

router.get('/CWE-284', (req, res) => {
    const role = req.query.role || 'user';
    if (role === 'admin') {
        res.send(`Sensitive Data: ${sensitiveData}`);
    } else {
        res.send('You are not authorized to view this data.');
    }
});

module.exports = router;
