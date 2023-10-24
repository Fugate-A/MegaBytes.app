const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 443; // Your HTTPS port

// SSL Certificate Configuration
const sslOptions = {
  key: fs.readFileSync('/etc/ssl/private/generated-private-key.key'),
  cert: fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
  ca: [
    fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
    fs.readFileSync('/etc/ssl/certs/gd_bundle-g2-g1.crt'),
  ],
};

// Create an HTTPS server
const server = https.createServer(sslOptions, app);

// Your Express app's routes and middleware
app.get('/', (req, res) => {
  res.send('Hello, secured World!');
});

// Start the HTTPS server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
