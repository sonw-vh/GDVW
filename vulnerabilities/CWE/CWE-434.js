const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/CWE-434', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: ${file.originalname}`);
});

module.exports = router;
