const express = require('express');
const router = express.Router();

let users = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }];

router.post('/CWE-352-admin', (req, res) => {
    const userId = parseInt(req.body.id);
    users = users.filter(user => user.id !== userId);
    res.send('User deleted.');
});

module.exports = router;
