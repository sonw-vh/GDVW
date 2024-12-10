const express = require('express');
const router = express.Router();

router.post('/CWE-502', (req, res) => {
    const userData = req.body;
    try {
        const deserializedData = JSON.parse(userData.payload); // Lỗ hổng deserialization
        res.send(`Deserialized: ${JSON.stringify(deserializedData)}`);
    } catch (err) {
        res.status(500).send('Error processing data');
    }
});

module.exports = router;
