const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const httpPort = 5000;
const httpsPort = 443;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from /var/www/megabytes/web_frontend/src/
app.use(express.static(path.join(__dirname, 'web_frontend', 'src'));

// Create an HTTPS server with SSL configuration
const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/generated-private-key.key'),
    cert: fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
    ca: [
        fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
        fs.readFileSync('/etc/ssl/certs/gd_bundle-g2-g1.crt'),
    ],
};

const httpsServer = https.createServer(httpsOptions, app);

// Start the HTTPS server on port 443
httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server is running on port ${httpsPort}`);
});

// Start the HTTP server on port 5000
app.listen(httpPort, () => {
    console.log(`HTTP Server is running on port ${httpPort}`);
});
