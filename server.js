const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url =
    'mongodb+srv://TheArchivist:R3c1p3Guard1an5K@cluster0.7i3llee.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

var api = require('./api.js');
api.setApp(app, client);

// HTTP port for regular HTTP traffic (if needed)
const httpPort = 5000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Create an HTTPS server with SSL configuration
const httpsOptions = {
    key: fs.readFileSync('/etc/ssl/private/generated-private-key.key'),
    cert: fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
    ca: [
        fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
        fs.readFileSync('/etc/ssl/certs/gd_bundle-g2-g1.crt'),
    ],
};

const httpsPort = 8443;

const httpsServer = https.createServer(httpsOptions, app);

// Start the HTTPS server on port 8443
httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server is running on port ${httpsPort}`);
});

// Start the HTTP server on port 5000 (if needed) and this is to push and pull easy 
app.listen(httpPort, () => {
    console.log(`HTTP Server is running on port ${httpPort}`);
});
