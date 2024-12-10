const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files for frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes for vulnerabilities
app.use(require('./vulnerabilities/CWE/CWE-89'));
app.use(require('./vulnerabilities/CWE/CWE-89-union'));
app.use(require('./vulnerabilities/CWE/CWE-89-boolean'));
app.use(require('./vulnerabilities/CWE/CWE-89-error'));
app.use(require('./vulnerabilities/CWE/CWE-89-blind'));
app.use(require('./vulnerabilities/CWE/CWE-79'));
app.use(require('./vulnerabilities/CWE/CWE-79-reflected'));
app.use(require('./vulnerabilities/CWE/CWE-352'));
app.use(require('./vulnerabilities/CWE/CWE-352-transfer'));
app.use(require('./vulnerabilities/CWE/CWE-352-cross-origin'));
app.use(require('./vulnerabilities/CVE/CVE-2021-44228'));
app.use(require('./vulnerabilities/CWE/CWE-918'));
app.use(require('./vulnerabilities/CWE/CWE-502'));
app.use(require('./vulnerabilities/CWE/CWE-601'));
app.use(require('./vulnerabilities/CVE/CVE-2017-5638'));
app.use(require('./vulnerabilities/CVE/CVE-2019-16759'));
app.use(require('./vulnerabilities/CVE/CVE-2020-1472'));
app.use(require('./vulnerabilities/CWE/CWE-74'));
app.use(require('./vulnerabilities/CWE/CWE-284'));
app.use(require('./vulnerabilities/CWE/CWE-798'));
app.use(require('./vulnerabilities/CWE/CWE-434'));
app.use(require('./vulnerabilities/CWE/CWE-352-admin'));
app.use(require('./vulnerabilities/CWE/CWE-89-pagination'));
app.use(require('./vulnerabilities/CWE/CWE-287'));
app.use(require('./vulnerabilities/CWE/CWE-89-orm-dynamic-query'));
app.use(require('./vulnerabilities/CWE/CWE-89-sql-join'));

// Homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
