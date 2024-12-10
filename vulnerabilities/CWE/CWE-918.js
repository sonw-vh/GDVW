const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/CWE-918', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('URL is required');
    }
    try {
        const response = await axios.get(targetUrl); // Lỗ hổng SSRF
        res.send(response.data);
    } catch (err) {
        res.status(500).send('Error fetching URL');
    }
});

module.exports = router;
