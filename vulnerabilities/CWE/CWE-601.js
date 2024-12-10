const express = require('express');
const router = express.Router();

router.get('/CWE-601', (req, res) => {
    const redirectUrl = req.query.url;
    if (!redirectUrl) {
        return res.status(400).send('URL is required');
    }
    res.redirect(redirectUrl); // Lỗ hổng Open Redirect
});

module.exports = router;
